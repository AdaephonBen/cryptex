package controllers

import (
	"github.com/npalladium/cryptex/server/pkg/db"
	"github.com/npalladium/cryptex/server/pkg/schema"
	"github.com/npalladium/cryptex/server/pkg/validate"
	"net/http"
)

func AdminAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		admin := new(schema.AdminCredentials)
		err := decodeJSONBody(w, r, &admin)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			return
		}
		validationErrors := validate.ValidateAdminCredentials(admin)
		if validationErrors != nil {
			var response = schema.ResponseError{validationErrors.Error()}
			serveJSON(w, http.StatusBadRequest, response)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func AddQuestionHandler(w http.ResponseWriter, r *http.Request) {
	question := new(schema.NewQuestion)
	err := decodeJSONBody(w, r, &question)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	err = db.CreateNewQuestion(r.Context(), question.QuestionNumber, question.Question, question.QuestionType, question.Answer, question.ReqScore)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	serveJSON(w, http.StatusOK, "")
}
