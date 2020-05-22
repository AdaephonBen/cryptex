package main

import (
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/npalladium/cryptex/server/pkg/config"
	"github.com/npalladium/cryptex/server/pkg/db"
)

func Init() {
	logs.Init()
	config.Init()
	db.Init()
}

func main() {
	Init()
}
