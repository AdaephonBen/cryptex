package main

import (
	"net/http"

	"github.com/npalladium/cryptex/server/pkg/auth"
	"github.com/npalladium/cryptex/server/pkg/config"
	"github.com/npalladium/cryptex/server/pkg/cronjobs"
	"github.com/npalladium/cryptex/server/pkg/db"
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/npalladium/cryptex/server/pkg/routes"
)

func Init() {
	logs.Init()
	config.Init()
	db.Init()
	auth.Init()
	var r = routes.Init()
	cronjobs.Init()
	http.ListenAndServe(":8080", r)
}

func main() {
	Init()
}
