package controllers

import (
	"net/http"

	"github.com/npalladium/cryptex/server/pkg/auth"
	"github.com/npalladium/cryptex/server/pkg/db"
)

type CheckAnswerRequest struct {
	Answer string `json:"answer"`
}

func GetQuestionHandler(w http.ResponseWriter, r *http.Request) {
	email_id := auth.GetEmail(r.Context())
	curr_question, err := db.GetQuestion(r.Context(), email_id)
	if err != nil {
		if err.Error() == "no rows in result set" {
			http.Error(w, http.StatusText(http.StatusNoContent), http.StatusNoContent)
			return
		}
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	serveJSON(w, http.StatusOK, curr_question)
}

func CheckAnswerHandler(w http.ResponseWriter, r *http.Request) {
	check_answer := new(CheckAnswerRequest)
	err := decodeJSONBody(w, r, &check_answer)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}
	email_id := auth.GetEmail(r.Context())
	err = db.CheckAnswer(r.Context(), email_id, check_answer.Answer)
	if err != nil {
		if err.Error() == "Incorrect Answer" {
			serveJSON(w, http.StatusOK, "incorrect-answer")
		} else {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		}
		return
	}
	err = db.IncrementUserLevel(r.Context(), email_id)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	serveJSON(w, http.StatusOK, "correct-answer")
}
