package controllers

import (
	"net/http"

	"github.com/npalladium/cryptex/server/pkg/db"
)

type HintsRequest struct {
	QuestionNumber int `json:"question_number"`
}

func GetHintsHandler(w http.ResponseWriter, r *http.Request) {
	hints_req := new(HintsRequest)
	err := decodeJSONBody(w, r, &hints_req)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}
	hints, err := db.GetHints(r.Context(), hints_req.QuestionNumber)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	serveJSON(w, http.StatusOK, hints)
}
