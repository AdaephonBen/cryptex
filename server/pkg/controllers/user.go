package controllers

import (
	"net/http"

	"github.com/npalladium/cryptex/server/pkg/auth"
	"github.com/npalladium/cryptex/server/pkg/db"
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/npalladium/cryptex/server/pkg/schema"
)

type NewUserStruct struct {
	Username string `json:"username"`
}

func NewUserHandler(w http.ResponseWriter, r *http.Request) {
	new_user := new(NewUserStruct)
	err := decodeJSONBody(w, r, &new_user)
	if err != nil {
		logs.LogWarning(err, "Unable to parse user JSON body")
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	email_id := auth.GetEmail(r.Context())
	err = db.CreateNewUser(r.Context(), new_user.Username, email_id)
	if err != nil {
		if err.Error() == "ERROR: duplicate key value violates unique constraint \"username_unique\" (SQLSTATE 23505)" {
			serveJSON(w, http.StatusBadRequest, schema.ResponseError{"duplicate-username"})
		} else if err.Error() == "ERROR: duplicate key value violates unique constraint \"email_id_unique\" (SQLSTATE 23505)" {
			serveJSON(w, http.StatusBadRequest, schema.ResponseError{"user-already-registered"})
		} else {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		}
		return
	}

	serveJSON(w, http.StatusOK, "")
}
