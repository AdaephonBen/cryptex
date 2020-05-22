package main

import (
	"database/sql"
	"strconv"
	"errors"
	"fmt"
	"net/http"
	"os"
	"regexp"
	"time"
	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/codegangsta/negroni"
	"github.com/dgrijalva/jwt-go"
	"github.com/json-iterator/go"
	"github.com/gorilla/mux"
	"github.com/lib/pq"
	"github.com/robfig/cron/v3"
    "github.com/jmoiron/sqlx"
	"github.com/gorilla/schema"
	"gopkg.in/go-playground/validator.v9"
)

var decoder = schema.NewDecoder() // Initialize gorilla schema decoder

var conn *sqlx.DB

var json = jsoniter.ConfigCompatibleWithStandardLibrary

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
	MaxLevel int `json:"maxLevel"`
}

type AnswerRequest struct {
	IDToken string `schema:"idToken"`
	Answer string `schema:"answer"`
}

type AnswerResponse struct {
	IsCorrect bool `json:"isCorrect"`
}

type LevelResponse struct {
	Level int `json:"level"`
}

type UsernameResponse struct {
	Username string `json:"username"`
}

var Files []*os.File
var correctFile *os.File

var leaderboard interface{}
var hints interface{}

var questions []Question
var answers []Answer

var jwks Jwks

func main() {
	// numberQuestions := 28
	// var err error
	// for i := 0; i < numberQuestions; i++ {
	// 	var theLevelFile *os.File
	// 	theLevelFile, err = os.OpenFile(strconv.Itoa(i)+".csv", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	// 	if (err != nil) {
	// 		fmt.Println("Error creating/appending to log files")
	// 		fmt.Println(err)
	// 	}
	// 	Files = append(Files, theLevelFile)
	// }
	// correctFile, err = os.OpenFile("correct.csv", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	// if (err != nil) {
		fmt.Println("Error creating/appending to correct log files")
	}
	downloadJWKS()
	c := cron.New()
	c.AddFunc("@every 5s", updateQuestionsAndAnswers)	
	c.AddFunc("@every 5h", downloadJWKS)
	c.AddFunc("@every 2s", sortLeaderboard)
	c.Start()
	v := validator.New()
	conn, err = sqlx.Open("postgres", os.Getenv("database"))
	conn.SetMaxOpenConns(11)
	if err != nil {
		fmt.Println("Error connecting to database. ")
	  }
	fmt.Println("Switch to AWS")
	fmt.Println("Run benchmarks with connection pooling")
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			// Verify 'aud' claim
			aud := "https://cryptex20.auth0.com/api/v2/"
			checkAud := token.Claims.(jwt.MapClaims).VerifyAudience(aud, false)
			if !checkAud {
				return token, errors.New("Invalid audience.")
			}
			// Verify 'iss' claim
			iss := "https://cryptex20.auth0.com/"
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
	                question(id_token, level): User's level and question are returned.
	            Public Routes
					Leaderboard: return the leaderboard with levels from 0 onwards.
					Level: Fast route, returns maxLevel
	*/
	router.HandleFunc("/api/leaderboard", LeaderboardHandler)
	router.HandleFunc("/api/level", LevelHandler)
	router.HandleFunc("/api/username", UsernameHandler)
	router.HandleFunc("/api/hints", HintsHandler)
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
			questionResponse.MaxLevel = maxLevel
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
	
	router.Handle("/api/answer", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Stuff that is being stored in the DB: name, username, contact number, email ID, level, last attempted timestamp
			// fmt.Println("pinged")
			var answerRequest AnswerRequest
			err := decoder.Decode(&answerRequest, r.URL.Query())
			if err != nil {
				fmt.Println("Error decoding r.URL.Query() into AnswerRequest struct")
				fmt.Println(r.URL.Query())
			}
			emailID := getEmail(answerRequest.IDToken)
			answerResponse := AnswerResponse{}
			var username string
			err = conn.Get(&username, "SELECT username FROM users WHERE email=$1", emailID)
			var currentLevel int
			err = conn.Get(&currentLevel, "SELECT level FROM users WHERE email=$1", emailID)
			var currentAnswer string
			err = conn.Get(&currentAnswer, "SELECT answer FROM answers WHERE level=$1", currentLevel)
			answerResponse.IsCorrect = currentAnswer == answerRequest.Answer && err == nil
			if (answerResponse.IsCorrect || (answerRequest.Answer == "" && currentLevel == -1)) {
				conn.NamedExec(`UPDATE users SET level=level+1, lastmodified=:time where email=:emailID`, map[string]interface{}{
					"emailID": emailID,
					"time": time.Now(),
				})
				answerResponse.IsCorrect = true
			}
			if (currentLevel >= 0) {
				go writeToFile(currentLevel, username, answerRequest.Answer, answerResponse.IsCorrect, time.Now())
			}
			serveJSON(w, answerResponse)
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
				// addUserResponse.ErrorCode = "Invalid username"
			}
			serveJSON(w, addUserResponse)
		}))))
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

func HintsHandler(w http.ResponseWriter, r *http.Request) {
	var list []map[string]interface{}
	rows, err := conn.Queryx(`SELECT * FROM hints ORDER BY index`)
	if (err != nil) {
		fmt.Println("Error selecting hints")
		fmt.Println(err)
	}
	for rows.Next() {
		row := make(map[string]interface{})
		err = rows.MapScan(row)
		if err != nil {
		  fmt.Println("Error Scanning row")
		  break
		}
		list = append(list, row)
	}
	var err1 error
	hints, err1 = json.Marshal(list)
	if (err1 != nil) {
		fmt.Println("Error Marshalling hints")
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(hints.([]byte))
}

func sortLeaderboard() {
	var list []map[string]interface{}
	rows, err := conn.Queryx(`SELECT username, level FROM users WHERE level >= 0 ORDER BY level DESC, lastmodified ASC`)
	if (err != nil) {
		fmt.Println("Error sorting database")
		fmt.Println(err)
	}
	for rows.Next() {
		row := make(map[string]interface{})
		err = rows.MapScan(row)
		if err != nil {
		  fmt.Println("Error Scanning row")
		  break
		}
		list = append(list, row)
	}
	var err1 error
	leaderboard, err1 = json.Marshal(list)
	if (err1 != nil) {
		fmt.Println("Error Marshalling sorted database")
	}
}

func UsernameHandler(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Query()["email"][0]
	var username string
	err := conn.Get(&username, "SELECT username FROM users WHERE email=$1", email)
	if (err == sql.ErrNoRows) {
		fmt.Println("UsernameHandler failed")
	} 
	usernameResponse := UsernameResponse{Username: username}
	serveJSON(w, usernameResponse)
}

func LeaderboardHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write(leaderboard.([]byte))
} 

func LevelHandler(w http.ResponseWriter, r *http.Request) {
	levelResponse := LevelResponse{}
	email := getEmail(r.URL.Query()["idToken"][0])
	var maxLevel int
	err := conn.Get(&maxLevel, "SELECT level FROM users WHERE email=$1", email)
	if (err == sql.ErrNoRows) {
		levelResponse.Level = -2
	} else if (err == nil) {
		levelResponse.Level = maxLevel
	} else {
		fmt.Println("Level serving failed")
		fmt.Println(err)
	}
	serveJSON(w, levelResponse)
}

func serveJSON(w http.ResponseWriter, class interface{}) {
	jsonToServe, _ := json.Marshal(class)
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonToServe)
}

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

func logToDatabase(username string, correctTimestamp time.Time, level int) {
	_, err := conn.NamedExec(`INSERT INTO correctAttempts (username, correctAttempt, level) VALUES (:username, :correctAttempt, :level)`, 
							map[string]interface{}{
								"username": username,
								"correctAttempt": correctTimestamp,
								"level": level,
		
						})
	if (err != nil) {
		fmt.Println("Error logging correct answers to database")
	}
}

func writeToFile(level int, username string, answer string, isCorrect bool, attemptTimestamp time.Time) {
	if _, err := Files[level].WriteString(strconv.Itoa(level) + ", " + string(username) + ", " + string(answer) + ", " + strconv.FormatBool(isCorrect) + ", " + String(int32(attemptTimestamp.Unix())) + "\n"); err != nil {
		fmt.Println("Error appending to file ", level)
	}
	if (isCorrect) {
		go logToDatabase(username, attemptTimestamp, level)
		if _, err := correctFile.WriteString(strconv.Itoa(level) + ", " + string(username) + ", " + String(int32(attemptTimestamp.Unix())) + "\n"); err != nil {
			fmt.Println("Error appending to correct file")
		}
	}
}

func downloadJWKS() {
	resp, err := http.Get("https://cryptex20.auth0.com/.well-known/jwks.json")
	if err != nil {
		fmt.Println("Error talking to Auth0")
	}
	defer resp.Body.Close()
	err = json.NewDecoder(resp.Body).Decode(&jwks)

	if err != nil {
		fmt.Println("Error talking to Auth0")
	}
}

func String(n int32) string {
    buf := [11]byte{}
    pos := len(buf)
    i := int64(n)
    signed := i < 0
    if signed {
        i = -i
    }
    for {
        pos--
        buf[pos], i = '0'+byte(i%10), i/10
        if i == 0 {
            if signed {
                pos--
                buf[pos] = '-'
            }
            return string(buf[pos:])
        }
    }
}
