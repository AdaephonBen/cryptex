package routes

import (
	"errors"
	"log"
	"net/http"

	"github.com/npalladium/cryptex/server/pkg/db"
	"github.com/npalladium/cryptex/server/pkg/schema"
	"github.com/npalladium/cryptex/server/pkg/validate"
)

func AddUserHandler(w http.ResponseWriter, r *http.Request) {
	user := new(schema.User)
	err := decodeJSONBody(w, r, &user)
	if err != nil {
        var mr *malformedRequest
        if errors.As(err, &mr) {
            http.Error(w, mr.msg, mr.status)
        } else {
            log.Println(err.Error())
            http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
        }
        return
    }
	validationErrors := validate.ValidateUser(user)
	if (validationErrors != nil) {
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
            log.Println(err.Error())
            http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
        }
        return
	}
	validationErrors := validate.ValidateQuestionRequest(questionRequest)
	if (validationErrors != nil) {
		var response = schema.ResponseError{validationErrors.Error()}
		serveJSON(w, http.StatusBadRequest, response)
		return
	}
	var userLevel int
	userLevel, err = db.GetLevel(questionRequest.Email_id)
	if (err != nil) {
		var response = schema.QuestionResponse{-2, ""}
		serveJSON(w, http.StatusBadRequest, response)
		return
	}
	var response = schema.QuestionResponse{}
	if (userLevel >= 0 && userLevel < len(db.Levels)) {
		response = schema.QuestionResponse{userLevel, db.Levels[userLevel].Question}
	} {
		response = schema.QuestionResponse{-3, ""} // Level -3 means you've won
	}
	serveJSON(w, http.StatusOK, response)
}