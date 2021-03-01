package controllers

import (
	"encoding/base64"
	"fmt"
	"github.com/npalladium/cryptex/server/pkg/db"
	"github.com/spf13/viper"
	"net/http"
	"strings"
)

type NewQuestion struct {
	QuestionNumber int                    `json:"question_number"`
	Question       map[string]interface{} `json:"question"`
	QuestionType   int                    `json:"question_type"`
	Answer         string                 `json:"answer"`
}

func AdminAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)

		s := strings.SplitN(r.Header.Get("Authorization"), " ", 2)
		if len(s) != 2 {
			http.Error(w, "Not authorized", 401)
			return
		}

		b, err := base64.StdEncoding.DecodeString(s[1])
		if err != nil {
			http.Error(w, err.Error(), 401)
			return
		}

		pair := strings.SplitN(string(b), ":", 2)
		if len(pair) != 2 {
			http.Error(w, "Not authorized", 401)
			return
		}

		if pair[0] != viper.GetString("admin_username") || pair[1] != viper.GetString("admin_password") {
			http.Error(w, "Not authorized", 401)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func AddQuestionHandler(w http.ResponseWriter, r *http.Request) {
	question := new(NewQuestion)
	err := decodeJSONBody(w, r, &question)
	if err != nil {
		fmt.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	err = db.CreateNewQuestion(r.Context(), question.QuestionNumber, question.Question, question.QuestionType, question.Answer)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	serveJSON(w, http.StatusOK, "")
}

func GetAllQuestionsHandler(w http.ResponseWriter, r *http.Request) {
	questions, err := db.GetAllQuestions(r.Context())
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	fmt.Println(questions)
	serveJSON(w, http.StatusOK, questions)
}
