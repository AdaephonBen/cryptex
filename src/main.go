package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/codegangsta/negroni"
	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

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

type user struct {
	Username string `json:"username"`
	Level    int    `json:"level"`
}

type DatabaseUserObject struct {
	Secret   string `json:"secret"`
	ClientID string `json:"clientID"`
	Username string `json:"username"`
	Level    int    `json:"level"`
}

type LevelResponse struct {
	Level int
	URL   string
}

var answers map[string]string

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "your-password"
	dbname   = "iith_dashboard"
)

var db *sql.DB

func authenticate(fn handler) {
    
}

func main() {
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			// Verify 'aud' claim
			aud := "https://cryptex2020.auth0.com/api/v2/"
			checkAud := token.Claims.(jwt.MapClaims).VerifyAudience(aud, false)
			if !checkAud {
				return token, errors.New("Invalid audience.")
			}
			// Verify 'iss' claim
			iss := "https://cryptex2020.auth0.com/"
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
	fmt.Println("Server started... ")
	fmt.Println("Answers initialized...")
	answers = make(map[string]string)
	answers["0"] = "random"
	answers["1"] = "nerdfameagain"
	answers["2"] = "ireland"
	answers["3"] = "beatles"
	answers["4"] = "magic"
	answers["5"] = "pabloescobar"
	answers["6"] = "fcuk"
	answers["7"] = "502286"
	// Connect MongoDB code
	var err error
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

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
    
    router.Handle("/api/adduser", )

	router.Handle("/api/private", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			message := "Hello from a private endpoint! You need to be authenticated to see this."
			responseJSON(message, w, http.StatusOK)
		}))))

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("../dist/")))
	http.ListenAndServe(":8080", router)
}
func getPemCert(token *jwt.Token) (string, error) {
	cert := ""
	resp, err := http.Get("https://cryptex2020.auth0.com/.well-known/jwks.json")

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

func responseJSON(message string, w http.ResponseWriter, statusCode int) {
	response := Response{message}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	w.Write(jsonResponse)
}
func AddUser(w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	find, _ := collection.Find(context.TODO(), bson.M{"clientID": vars["ID"]})
	JSOND, _ := json.Marshal(find.Next(context.TODO()))
	UserStatus := string(JSOND)
	if strings.Compare(UserStatus, "false") == 0 {
		_, _ = collection.InsertOne(context.TODO(), bson.M{"clientID": vars["ID"], "username": vars["username"], "level": -1, "secret": vars["secret"][0:378], "lastModified": time.Now().UTC()})
	}
}
func AcceptedRules(w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	fmt.Println(vars["secret"][0:378])
	filter := bson.D{{"secret", vars["secret"][0:378]}}
	update := bson.D{
		{"$set", bson.D{
			{"level", 0},
		}},
	}
	_, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}
}
func AnswerQuestion(w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	find, _ := collection.Find(context.TODO(), bson.M{"secret": vars["secret"][0:378]})
	JSOND, _ := json.Marshal(find.Next(context.TODO()))
	if strings.Compare(string(JSOND), "true") == 0 {
		if val, ok := answers[vars["level"]]; ok {
			var current DatabaseUserObject
			err := find.Decode(&current)
			if err != nil {
				fmt.Println("Error decoding database object ", err)
			}
			fmt.Println(current.Username, " ", current.Level, " ", vars["answer"])
			if strings.Compare(strconv.Itoa(current.Level), vars["level"]) == 0 {
				if strings.Compare(val, vars["answer"]) == 0 {
					filter := bson.D{{"secret", vars["secret"][0:378]}}
					update := bson.D{
						{"$inc", bson.D{
							{"level", 1},
						}},
					}
					_, err := collection.UpdateOne(context.TODO(), filter, update)
					update = bson.D{
						{"$set", bson.D{
							{"lastModified", time.Now().UTC()},
						}},
					}
					_, err = collection.UpdateOne(context.TODO(), filter, update)
					if err != nil {
						fmt.Println("Error updating ", err)
						responseJSON("DatabaseError", w, http.StatusInternalServerError)
					} else {
						responseJSON("Correct", w, http.StatusOK)
					}
				} else {
					responseJSON("Wrong", w, http.StatusOK)
				}
			} else {
				responseJSON("LevelNoMatch", w, http.StatusOK)
			}
		} else {
			responseJSON("InvalidLevel", w, http.StatusOK)
		}
	} else {
		responseJSON("InvalidToken", w, http.StatusOK)
	}
}
func LeaderboardHandler(w http.ResponseWriter, request *http.Request) {
	options := options.Find()
	options.SetSort(bson.D{{"level", -1}, {"lastModified", 1}})
	find, _ := collection.Find(context.TODO(), bson.M{}, options)
	var results []user
	for find.Next(context.TODO()) {
		// create a value into which the single document can be decoded
		var elem user
		err := find.Decode(&elem)
		fmt.Println(elem)
		if err != nil {
			fmt.Println("Error decoding leaderboard item")
		}
		results = append(results, elem)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	jData, _ := json.Marshal(results)
	w.Write(jData)
}
func LevelHandler(w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	find, _ := collection.Find(context.TODO(), bson.M{"secret": vars["secret"][0:378]})
	JSOND, _ := json.Marshal(find.Next(context.TODO()))
	if strings.Compare(string(JSOND), "true") == 0 {
		var current DatabaseUserObject
		err := find.Decode(&current)
		if err != nil {
			fmt.Println("Not able to read database object")
			responseJSON("DatabaseError", w, http.StatusInternalServerError)
		} else {
			var resp LevelResponse
			if current.Level == 0 {
				resp = LevelResponse{0, "https://res.cloudinary.com/drgddftct/image/upload/v1547292346/QPADBgJd8EkeBut6.png"}
			} else if current.Level == 1 {
				resp = LevelResponse{1, "https://res.cloudinary.com/dmridruee/image/upload/v1547295044/qsQK5bRhRvgXjh378d5J/7yXw9wkWaTMXafsC7USs.png"}
			} else if current.Level == 2 {
				resp = LevelResponse{2, "169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E169B62169B62169B62FFFFFFFFFFFFFFFFFFFF883EFF883EFF883E"}
			} else if current.Level == 3 {
				resp = LevelResponse{3, "/midi.mid"}
			} else if current.Level == 4 {
				resp = LevelResponse{4, "https://res.cloudinary.com/do3uy82tk/image/upload/v1564096693/asdfasdf.jpg"}
			} else if current.Level == 5 {
				resp = LevelResponse{5, "https://res.cloudinary.com/dmridruee/image/upload/v1547211291/0PNQNGAOck2NQwyb6hQV.png"}
			} else if current.Level == 6 {
				resp = LevelResponse{6, "https://res.cloudinary.com/dmridruee/image/upload/v1547192728/fpF6juWJPP7D2S9BJWcc/LQtD12ldlFRZ4OT90cDj.png"}
			} else if current.Level == 7 {
				resp = LevelResponse{7, "https://res.cloudinary.com/drgddftct/image/upload/v1547371349/5g92e2eRNxtjrDLg/XbWkuXbv8tCpRwwK.gif"}
			} else {
				resp = LevelResponse{8, "Won"}
			}
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			jData, _ := json.Marshal(resp)
			w.Write(jData)
		}
	}
}

func LevelQueryHandler(w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	find, _ := collection.Find(context.TODO(), bson.M{"clientID": vars["clientid"]})
	JSOND, _ := json.Marshal(find.Next(context.TODO()))
	// Returning the level of the queried user
	if strings.Compare(string(JSOND), "true") == 0 {
		var current DatabaseUserObject
		_ = find.Decode(&current)
		responseJSON(strconv.Itoa(current.Level), w, http.StatusOK)
	} else {
		responseJSON("-2", w, http.StatusOK)
	}
}

func DoesUsernameExistHandler(w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	find, _ := collection.Find(context.TODO(), bson.M{"username": vars["username"]})
	JSOND, _ := json.Marshal(find.Next(context.TODO()))
	// Returning the level of the queried user
	if strings.Compare(string(JSOND), "true") == 0 {
		responseJSON("true", w, http.StatusOK)
	} else {
		responseJSON("false", w, http.StatusOK)
	}
}

func LeaderboardTableHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../leaderboard.html")
}

func CSSHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../prerenderedviews/css/index.css")
}

func RulesHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../rules.html")
}

func MIDIHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "cryptex.mid")
}
