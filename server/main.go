package main

import (
	"fmt"
	"net/http"

	"github.com/npalladium/cryptex/server/pkg/auth"
	"github.com/npalladium/cryptex/server/pkg/config"
	"github.com/npalladium/cryptex/server/pkg/cronjobs"
	"github.com/npalladium/cryptex/server/pkg/db"
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/npalladium/cryptex/server/pkg/routes"
	"github.com/spf13/viper"
)

func Init() {
	logs.Init()
	config.Init()
	fmt.Println(viper.GetString("auth0_iss"))
	db.Init()
	jwtmiddleware := auth.Init()
	var r = routes.Init(jwtmiddleware)
	cronjobs.Init()
	http.ListenAndServe(":8080", r)
}

func main() {
	Init()
}
