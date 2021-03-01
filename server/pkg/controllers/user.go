package controllers

import (
	"net/http"

	"github.com/npalladium/cryptex/server/pkg/auth"
	"github.com/npalladium/cryptex/server/pkg/db"
)

type NewUserStruct struct {
	IdToken  string `json:"id_token"`
	Username string `json:"username"`
}

func NewUserHandler(w http.ResponseWriter, r *http.Request) {
	new_user := new(NewUserStruct)
	err := decodeJSONBody(w, r, &new_user)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	email_id := auth.GetEmail(r.Context())
	err = db.CreateNewUser(r.Context(), new_user.Username, email_id)
	if err != nil {
		return
	}

	serveJSON(w, http.StatusOK, "")
}
