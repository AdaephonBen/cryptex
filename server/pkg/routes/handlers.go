package routes

import (
	"errors"
	"net/http"

	"github.com/npalladium/cryptex/server/pkg/db"
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/npalladium/cryptex/server/pkg/schema"
	"github.com/npalladium/cryptex/server/pkg/validate"

	"golang.org/x/crypto/bcrypt"
)

func AddUserHandler(w http.ResponseWriter, r *http.Request) {
	user := new(schema.User)
	err := decodeJSONBody(w, r, &user)
	if err != nil {
		var mr *malformedRequest
		if errors.As(err, &mr) {
			http.Error(w, mr.msg, mr.status)
		} else {
			logs.LogWarning("Error in adding user", err)
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		}
		return
	}
	validationErrors := validate.ValidateUser(user)
	if validationErrors != nil {
		var response = schema.ResponseError{validationErrors.Error()}
		serveJSON(w, http.StatusBadRequest, response)
		return
	}
	if !db.InsertUser(user.Email_id, user.Username) {
		var response = schema.ResponseError{"Could not create user. "}
		serveJSON(w, http.StatusInternalServerError, response)
		return
	}
	var response = schema.ResponseError{"Created user. "}
	serveJSON(w, http.StatusOK, response)
}

func GetQuestionHandler(w http.ResponseWriter, r *http.Request) {
	var questionRequest = new(schema.QuestionRequest)
	err := decodeJSONBody(w, r, &questionRequest)
	if err != nil {
		var mr *malformedRequest
		if errors.As(err, &mr) {
			http.Error(w, mr.msg, mr.status)
		} else {
			logs.LogWarning("Error while retrieving question", err)
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		}
		return
	}
	validationErrors := validate.ValidateQuestionRequest(questionRequest)
	if validationErrors != nil {
		var response = schema.ResponseError{validationErrors.Error()}
		serveJSON(w, http.StatusBadRequest, response)
		return
	}
	var userLevel int
	userLevel, err = db.GetLevel(questionRequest.Email_id)
	if err != nil {
		var response = schema.QuestionResponse{-2, ""}
		serveJSON(w, http.StatusBadRequest, response)
		return
	}
	var response = schema.QuestionResponse{}
	if userLevel >= 0 && userLevel < len(db.Levels) {
		response = schema.QuestionResponse{userLevel, db.Levels[userLevel].Question}
	} else {
		response = schema.QuestionResponse{-3, ""} // Level -3 means you've won
	}
	serveJSON(w, http.StatusOK, response)
}

func CheckAnswerHandler(w http.ResponseWriter, r *http.Request) {
	var answerRequest = new(schema.AnswerRequest)
	err := decodeJSONBody(w, r, &answerRequest)
	if err != nil {
		var mr *malformedRequest
		if errors.As(err, &mr) {
			http.Error(w, mr.msg, mr.status)
		} else {
			logs.LogWarning("Error while checking the answer", err)
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		}
		return
	}
	validationErrors := validate.ValidateAnswerRequest(answerRequest)
	if validationErrors != nil {
		var response = schema.ResponseError{validationErrors.Error()}
		serveJSON(w, http.StatusBadRequest, response)
		return
	}
	var userLevel int
	userLevel, err = db.GetLevel(answerRequest.Email_id)
	if err != nil {
		var response = schema.QuestionResponse{-2, ""}
		serveJSON(w, http.StatusBadRequest, response)
		return
	}
	err = CompareHashAndPassword(db.Levels[userLevel].Answer, answerRequest.Answer)
	if err != nil {
		var response = schema.AnswerResponse{"Incorrect"}
		serveJSON(w, http.StatusOK, response)
		return
	}
	err = UpdateUserProgress(answerRequest.Email_id)
	if err != nil {
		var response = schema.ResponseError{"Couldn't update score. "}
		serveJSON(w, http.StatusBadRequest, response)
		return
	}
	var response = schema.AnswerResponse{"Correct"}
	serveJSON(w, http.StatusOK, response)
	return
}

func ServeLeaderboardHandler(w http.ResponseWriter, r *http.Request) {

	serveJSON(w, http.StatusOK, db.Leaderboard)
}
