package config

import (
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/spf13/viper"
)

func Init() {
	logs.LogStatus("Attempting to read config files...")
	viper.SetConfigName("config")
	viper.SetConfigType("json")
	viper.AddConfigPath("../config")
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			logs.LogError("Config file not found", err)
		} else {
			logs.LogError("Error while reading config file", err)
		}
	}
	logs.LogStatus("Successfully read config files...")
}
