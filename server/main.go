package main

import (
	"github.com/npalladium/cryptex/server/pkg/auth"
	"github.com/npalladium/cryptex/server/pkg/config"
	"net/http"
	"os"
	// "github.com/npalladium/cryptex/server/pkg/cronjobs"
	"github.com/npalladium/cryptex/server/pkg/db"
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/npalladium/cryptex/server/pkg/routes"
)

func Init(config_dir string) {
	logs.Init()
	config.Init(config_dir)
	db.Init()
	auth.Init()
	var r = routes.Init()
	// cronjobs.Init()
	http.ListenAndServe(":8080", r)
}

func main() {
	var config_dir string
	if len(os.Args) > 1 {
		config_dir = os.Args[1]
	} else {
		config_dir = "../config"
	}

	Init(config_dir)
}
