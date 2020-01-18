package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	// "os"
	"regexp"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/codegangsta/negroni"
	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/lib/pq"
	"github.com/robfig/cron/v3"
    "github.com/jmoiron/sqlx"
	"github.com/gorilla/schema"
	"gopkg.in/go-playground/validator.v9"

)

var decoder = schema.NewDecoder() // Initialize gorilla schema decoder

var conn *sqlx.DB

type Response struct {
	Message string `json:"message"`
}



type Jwks struct {
	Keys []JSONWebKeys `json:"keys"`
}

type JSONWebKeys struct {
	Kty string   `json:"kty"`
	Kid string   `json:"kid"`
	Use string   `json:"use"`
	N   string   `json:"n"`
	E   string   `json:"e"`
	X5c []string `json:"x5c"`
}

// type user struct {
// 	Username string `json:"username"`
// 	Level    int    `json:"level"`
// }



type LevelResponse struct {
	Level int
	URL   string
}

// New stuff

type UserDetails struct {
	Name        string `schema:"name"`
	Username    string `schema:"username"`
	PhoneNumber string `schema:"phonenumber"`
	IDToken     string `schema:"idToken"`
}

type Question struct {
	QuestionText string `db:"question"`
	Level        int    `db:"level"`
}

type Answer struct {
	AnswerHash string `db:"answer"`
	Level      int `db:"level"`
}

type DatabaseUserObject struct {
	Name        string `validate:"required"`
	Username    string `validate:"required"`
	PhoneNumber string 
	Email     string 	`validate:"required"`
	Level int `validate:"required"`
	Lastmodified time.Time `validate:"required"`
}

type AddUserResponse struct {
	Username  string `json:"username"`
	ErrorCode string `json:"errorCode"`
}

type QuestionRequest struct {
	Level int `schema:"level"`
	IDToken string `schema:"idToken"`
}

type QuestionResponse struct {
	Level int `json:"level"`
	ErrorCode string `json:"errorCode"`
	Question string `json:"question"`
}

var questions []Question
var answers []Answer

func main() {
	c := cron.New()
	c.AddFunc("@every 5s", updateQuestionsAndAnswers)	
	c.Start()
	v := validator.New()
	var err error
	conn, err = sqlx.Connect("postgres", "postgresql://doadmin:mzyqulbu70zvahdp@db-postgresql-blr1-23394-do-user-6380924-0.db.ondigitalocean.com:25060/defaultdb?sslmode=require")
	conn.SetMaxOpenConns(11)
	if err != nil {
		fmt.Println("Error connecting to database. ")
	  }
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			// Verify 'aud' claim
			aud := "https://cryptex.auth0.com/api/v2/"
			checkAud := token.Claims.(jwt.MapClaims).VerifyAudience(aud, false)
			if !checkAud {
				return token, errors.New("Invalid audience.")
			}
			// Verify 'iss' claim
			iss := "https://cryptex.auth0.com/"
			checkIss := token.Claims.(jwt.MapClaims).VerifyIssuer(iss, false)
			if !checkIss {
				return token, errors.New("Invalid issuer.")
			}

			cert, err := getPemCert(token)
			if err != nil {
				panic(err.Error())
			}

			result, _ := jwt.ParseRSAPublicKeyFromPEM([]byte(cert))
			return result, nil
		},
		SigningMethod: jwt.SigningMethodRS256,
	})

	fmt.Println("Successfully connected to PostgreSQL DB. ")

	router := mux.NewRouter()

	/* API Routes :
			    Protected Routes (Bearer access_token):
		            adduser(username, id_token): Adds a user to the DB. Stuff to add: username, level: -1, email: from id_token, dateModified: for sorting, also return
		                error message if username exists.
		            answer(id_token, answer): User's current level is checked, answer is matched against answer[level]. level and dateModified are updated, as required.
	                question(id_token): User's level and question are returned.
	            Public Routes
	                Leaderboard: return the leaderboard with levels from 0 onwards.
	*/

	// router.HandleFunc("/adduser/{ID}/{username}/{secret}", AddUser)
	// router.HandleFunc("/acceptedrules/{secret}", AcceptedRules)
	// router.HandleFunc("/answer/{secret}/{level}/{answer}", AnswerQuestion)
	// router.HandleFunc("/level/{secret}", LevelHandler)
	// router.HandleFunc("/leaderboard", LeaderboardHandler)
	// router.HandleFunc("/leaderboardtable", LeaderboardTableHandler)
	// router.HandleFunc("/css", CSSHandler)
	// router.HandleFunc("/rules", RulesHandler)
	// router.HandleFunc("/whichlevel/{clientid}", LevelQueryHandler)
	// router.HandleFunc("/doesUsernameExist/{username}", DoesUsernameExistHandler)
	router.Handle("/api/question", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Stuff that is being stored in the DB: name, username, contact number, email ID, level, last attempted timestamp
			// fmt.Println("pinged")
			var questionRequest QuestionRequest
			err := decoder.Decode(&questionRequest, r.URL.Query())
			if err != nil {
				fmt.Println("Error decoding r.URL.Query() into QuestionRequest struct")
				fmt.Println(r.URL.Query())
			}
			emailID := getEmail(questionRequest.IDToken)
			questionResponse := QuestionResponse{Level: questionRequest.Level}
			var maxLevel int
			err = conn.Get(&maxLevel, "SELECT level FROM users WHERE email=$1", emailID)
			if (questionResponse.Level <= maxLevel && err == nil) {
				var currentQuestion string
				err = conn.Get(&currentQuestion, "SELECT question FROM questions WHERE level=$1", questionResponse.Level)
				if (err != nil) {
					questionResponse.ErrorCode = "Unexpected error"
				} else {
					questionResponse.Question = currentQuestion
					questionResponse.ErrorCode = "Success"
				}
			} else {
				questionResponse.ErrorCode = "Invalid permissions"
			}
			serveJSON(w, questionResponse)
		}))))
	
		router.Handle("/api/adduser", negroni.New(
			negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
			negroni.Wrap(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				var userDetailStruct UserDetails
				err := decoder.Decode(&userDetailStruct, r.URL.Query())
				if err != nil {
					fmt.Println("Error decoding r.URL.Query() into UserDetails struct")
					fmt.Println(r.URL.Query())
				}
				emailID := getEmail(userDetailStruct.IDToken)
				usernameValidator := regexp.MustCompile("^[a-zA-Z0-9]([._@-]|[a-zA-Z0-9]){6,62}[a-zA-Z0-9]$")
				isValid := usernameValidator.MatchString(userDetailStruct.Username)
				addUserResponse := AddUserResponse{Username: userDetailStruct.Username}
				if (isValid) {
					toBeInserted := DatabaseUserObject{
						Name: userDetailStruct.Name,
						Username: userDetailStruct.Username,
						PhoneNumber: userDetailStruct.PhoneNumber,
						Email: emailID,
						Level: -1,
						Lastmodified: time.Now(),
					}
					validationError := v.Struct(toBeInserted)
					
					if (validationError != nil) {
						addUserResponse.ErrorCode = "Validation error"
					} else {
						_, err = conn.NamedExec(`INSERT INTO users (name, username, phone, email, level, lastmodified) VALUES (:name, :username, :phone, :email, :level, :last)`, 
							map[string]interface{}{
								"name": toBeInserted.Name,
								"username": toBeInserted.Username,
								"phone": toBeInserted.PhoneNumber,
								"email": toBeInserted.Email,
								"level": toBeInserted.Level,
								"last": toBeInserted.Lastmodified,
		
						})
						if pgerr, ok := err.(*pq.Error); ok {
							if pgerr.Code == "23505" {
								addUserResponse.ErrorCode = "Duplicate username"
							} else {
								addUserResponse.ErrorCode = "Unknown error"
							}
						} else {
							addUserResponse.ErrorCode = "Success"
						}
					}
				} else {
					addUserResponse.ErrorCode = "Invalid username"
				}
				serveJSON(w, addUserResponse)
			}))))

	// router.PathPrefix("/").Handler(http.FileServer(http.Dir("../dist/"))) // Replace serving with nginx
	
	http.ListenAndServe(":8080", router)

}

func getEmail(token string) string {
	claims := jwt.MapClaims{}

	jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		x, err := getPemCert(token)
		return []byte(x), err
	})
	return claims["email"].(string)
}

func serveJSON(w http.ResponseWriter, class interface{}) {
	jsonToServe, _ := json.Marshal(class)
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonToServe)
}

// func createSchema(db *pg.DB) error {
//     for _, model := range []interface{}{(*DatabaseUserObject)(nil)} {
//         err := db.CreateTable(model, &orm.CreateTableOptions{
//             Temp: true,
//         })
//         if err != nil {
//             return err
//         }
//     }
//     return nil
// }
func updateQuestionsAndAnswers() {
	fmt.Println("Updating questions & answers")
	var length int
	err := conn.Get(&length, "SELECT count(*) FROM questions")
	if err == nil {
		if length >= (len(questions)) {
			questions = nil
			answers = nil
			rows, err := conn.Queryx("SELECT * FROM questions")
			if err != nil {
				fmt.Println("Error reading Questions database")
				fmt.Println(err)
			}
			defer rows.Close()
			// Iterate through the result set
			for rows.Next() {
				var question Question
				err = rows.StructScan(&question)
				if err != nil {
					fmt.Println("Error reading question from Questions database")
					fmt.Println(err)
				}
				questions = append(questions, question)
			}
			// Any errors encountered by rows.Next or rows.Scan will be returned here
			if rows.Err() != nil {
				fmt.Println("Error reading Questions database")
				fmt.Println(err)
			}
			rows, err = conn.Queryx("select * from answers")
			if err != nil {
				fmt.Println("Error reading Answers database")
				fmt.Println(err)
			}
			defer rows.Close()
			// Iterate through the result set
			for rows.Next() {
				var answer Answer
				err = rows.StructScan(&answer)
				if err != nil {
					fmt.Println("Error reading answer from Answers database")
				}
				answers = append(answers, answer)
			}
			// Any errors encountered by rows.Next or rows.Scan will be returned here
			if rows.Err() != nil {
				fmt.Println("Error reading Answers database")
				fmt.Println(err)
			}
		}
	}
}

func getPemCert(token *jwt.Token) (string, error) {
	cert := ""
	resp, err := http.Get("https://cryptex.auth0.com/.well-known/jwks.json")

	if err != nil {
		return cert, err
	}
	defer resp.Body.Close()

	var jwks = Jwks{}
	err = json.NewDecoder(resp.Body).Decode(&jwks)

	if err != nil {
		return cert, err
	}

	for k, _ := range jwks.Keys {
		if token.Header["kid"] == jwks.Keys[k].Kid {
			cert = "-----BEGIN CERTIFICATE-----\n" + jwks.Keys[k].X5c[0] + "\n-----END CERTIFICATE-----"
		}
	}

	if cert == "" {
		err := errors.New("Unable to find appropriate key.")
		return cert, err
	}

	return cert, nil
}

// func AcceptedRules(w http.ResponseWriter, request *http.Request) {
// 	vars := mux.Vars(request)
// 	fmt.Println(vars["secret"][0:378])
// 	filter := bson.D{{"secret", vars["secret"][0:378]}}
// 	update := bson.D{
// 		{"$set", bson.D{
// 			{"level", 0},
// 		}},
// 	}
// 	_, err := collection.UpdateOne(context.TODO(), filter, update)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// }
// func AnswerQuestion(w http.ResponseWriter, request *http.Request) {
// 	vars := mux.Vars(request)
// 	find, _ := collection.Find(context.TODO(), bson.M{"secret": vars["secret"][0:378]})
// 	JSOND, _ := json.Marshal(find.Next(context.TODO()))
// 	if strings.Compare(string(JSOND), "true") == 0 {
// 		if val, ok := answers[vars["level"]]; ok {
// 			var current DatabaseUserObject
// 			err := find.Decode(&current)
// 			if err != nil {
// 				fmt.Println("Error decoding database object ", err)
// 			}
// 			fmt.Println(current.Username, " ", current.Level, " ", vars["answer"])
// 			if strings.Compare(strconv.Itoa(current.Level), vars["level"]) == 0 {
// 				if strbigint	{"$inc", bson.D{
// 							{"level", 1},
// 						}},
// 					}
// 					_, err := collection.UpdateOne(context.TODO(), filter, update)
// 					update = bson.D{
// 						{"$set", bson.D{
// 							{"lastModified", time.Now().UTC()},
// 						}},
// 					}
// 					_, err = collection.UpdateOne(context.TODO(), filter, update)
// 					if err != nil {
// 						fmt.Println("Error updating ", err)
// 						responseJSON("DatabaseError", w, http.StatusInternalServerError)
// 					} else {
// 						responseJSON("Correct", w, http.StatusOK)
// 					}
// 				} else {
// 					responseJSON("Wrong", w, http.StatusOK)
// 				}
// 			} else {
// 				responseJSON("LevelNoMatch", w, http.StatusOK)
// 			}
// 		} else {
// 			responseJSON("InvalidLevel", w, http.StatusOK)
// 		}
// 	} else {
// 		responseJSON("InvalidToken", w, http.StatusOK)
// 	}
// }
// func LeaderboardHandler(w http.ResponseWriter, request *http.Request) {
// 	options := options.Find()
// 	options.SetSort(bson.D{{"level", -1}, {"lastModified", 1}})
// 	find, _ := collection.Find(context.TODO(), bson.M{}, options)
// 	var results []user
// 	for find.Next(context.TODO()) {
// 		// create a value into which the single document can be decoded
// 		var elem user
// 		err := find.Decode(&elem)
// 		fmt.Println(elem)
// 		if err != nil {
// 			fmt.Println("Error decoding leaderboard item")
// 		}
// 		results = append(results, elem)
// 	}
// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	jData, _ := json.Marshal(results)
// 	w.Write(jData)
// }
// func LevelHandler(w http.ResponseWriter, request *http.Request) {
// 	vars := mux.Vars(request)
// 	find, _ := collection.Find(context.TODO(), bson.M{"secret": vars["secret"][0:378]})
// 	JSOND, _ := json.Marshal(find.Next(context.TODO()))
// 	if strings.Compare(string(JSOND), "true") == 0 {
// 		var current DatabaseUserObject
// 		err := find.Decode(&current)
// 		if err != nil {
// 			fmt.Println("Not able to read database object")
// 			responseJSON("DatabaseError", w, http.StatusInternalServerError)
// 		} else {
// 			var resp LevelResponse
// 			if current.Level == 0 {
// 				resp = LevelResponse{0, "https://res.cloudinary.com/drgddftct/image/upload/v1547292346/QPADBgJd8EkeBut6.png"}
// 			} else if current.Level == 1 {
// 				resp = LevelResponse{1, "https://res.cloudinary.com/dmridruee/image/upload/v1547295044/qsQK5bRhRvgXjh378d5J/7yXw9wkWaTMXafsC7USs.png"}
// 			} else if current.Level == 2 {
// 				resp = LevelResponse{2, "169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E"}
// 			} else if current.Level == 3 {
// 				resp = LevelResponse{3, "/midi.mid"}
// 			} else if current.Level == 4 {
// 				resp = LevelResponse{4, "https://res.cloudinary.com/do3uy82tk/image/upload/v1564096693/asdfasdf.jpg"}
// 			} else if current.Level == 5 {
// 				resp = LevelResponse{5, "https://res.cloudinary.com/dmridruee/image/upload/v1547211291/0PNQNGAOck2NQwyb6hQV.png"}
// 			} else if current.Level == 6 {
// 				resp = LevelResponse{6, "https://res.cloudinary.com/dmridruee/image/upload/v1547192728/fpF6juWJPP7D2S9BJWcc/LQtD12ldlFRZ4OT90cDj.png"}
// 			} else if current.Level == 7 {
// 				resp = LevelResponse{7, "https://res.cloudinary.com/drgddftct/image/upload/v1547371349/5g92e2eRNxtjrDLg/XbWkuXbv8tCpRwwK.gif"}
// 			} else {
// 				resp = LevelResponse{8, "Won"}
// 			}
// 			w.Header().Set("Content-Type", "application/json")
// 			w.WriteHeader(http.StatusOK)
// 			jData, _ := json.Marshal(resp)
// 			w.Write(jData)
// 		}
// 	}
// }

// func LevelQueryHandler(w http.ResponseWriter, request *http.Request) {
// 	vars := mux.Vars(request)
// 	find, _ := collection.Find(context.TODO(), bson.M{"clientID": vars["clientid"]})
// 	JSOND, _ := json.Marshal(find.Next(context.TODO()))
// 	// Returning the level of the queried user
// 	if strings.Compare(string(JSOND), "true") == 0 {
// 		var current DatabaseUserObject
// 		_ = find.Decode(&current)
// 		responseJSON(strconv.Itoa(current.Level), w, http.StatusOK)
// 	} else {
// 		responseJSON("-2", w, http.StatusOK)
// 	}
// }

// func DoesUsernameExistHandler(w http.ResponseWriter, request *http.Request) {
// 	vars := mux.Vars(request)
// 	find, _ := collection.Find(context.TODO(), bson.M{"username": vars["username"]})
// 	JSOND, _ := json.Marshal(find.Next(context.TODO()))
// 	// Returning the level of the queried user
// 	if strings.Compare(string(JSOND), "true") == 0 {
// 		responseJSON("true", w, http.StatusOK)
// 	} else {
// 		responseJSON("false", w, http.StatusOK)
// 	}
// }

// func LeaderboardTableHandler(w http.ResponseWriter, r *http.Request) {
// 	http.ServeFile(w, r, "../leaderboard.html")
// }

// func CSSHandler(w http.ResponseWriter, r *http.Request) {
// 	http.ServeFile(w, r, "../prerenderedviews/css/index.css")
// }

// func RulesHandler(w http.ResponseWriter, r *http.Request) {
// 	http.ServeFile(w, r, "../rules.html")
// }

// func MIDIHandler(w http.ResponseWriter, r *http.Request) {
// 	http.ServeFile(w, r, "cryptex.mid")
// }
