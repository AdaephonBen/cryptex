package config

import (
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/spf13/viper"
)

func Init() {
	logs.LogStatus("Attempting to read config envs...")
	viper.AutomaticEnv()
	logs.LogStatus("Successfully read config envs...")
}
