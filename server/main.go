package main

import (
	"net/http"
	"log"
  	"github.com/gorilla/mux"

	"github.com/npalladium/cryptex/server/pkg/config"
	"github.com/npalladium/cryptex/server/pkg/cronjobs"
	"github.com/npalladium/cryptex/server/pkg/db"
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/npalladium/cryptex/server/pkg/routes"
	"github.com/npalladium/cryptex/server/pkg/auth"
)

func Init() {
	logs.Init()
	config.Init()
	db.Init()
	var r = routes.Init()
	cronjobs.Init()
	router := mux.NewRouter()
	r.Handle("/api/user-details", auth.JwtMiddleware.Handler(routes.GetUserDetailsHandler)).Methods("POST")
	http.ListenAndServe(":8000", (r))
	log.Fatal(http.ListenAndServe(":8080", r))
}

func main() {
	Init()
}
