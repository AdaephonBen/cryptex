package controllers

import (
	"fmt"
	"net/http"

	"github.com/npalladium/cryptex/server/pkg/auth"
	"github.com/npalladium/cryptex/server/pkg/db"
)

type UseLifelineRequest struct {
	Lifeline string `json:"lifeline"`
}

func UseLifelineHandler(w http.ResponseWriter, r *http.Request) {
	lifeline_req := new(UseLifelineRequest)
	err := decodeJSONBody(w, r, &lifeline_req)
	fmt.Println(err)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}
	email_id := auth.GetEmail(r.Context())
	result, err := db.CheckLifeline(r.Context(), email_id, lifeline_req.Lifeline)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}
	serveJSON(w, http.StatusOK, result)
}

func GetAvailableLifelinesHandler(w http.ResponseWriter, r *http.Request) {
	email_id := auth.GetEmail(r.Context())
	lifelines, err := db.GetAvailableLifelines(r.Context(), email_id)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	serveJSON(w, http.StatusOK, lifelines)
}
