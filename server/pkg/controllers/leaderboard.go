package controllers

import (
	"github.com/npalladium/cryptex/server/pkg/db"
	"net/http"
)

func GetLeaderboardHandler(w http.ResponseWriter, r *http.Request) {
	serveJSON(w, http.StatusOK, &db.Leaderboard)
}
