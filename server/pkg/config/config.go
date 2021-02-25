package config

import (
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/spf13/viper"
)

func Init(config_dir string) {
	logs.LogStatus("Attempting to read config files...")
	viper.SetConfigName("config")
	viper.SetConfigType("json")
	viper.AddConfigPath(config_dir)
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			logs.LogError(err, "Config file not found")
		} else {
			logs.LogError(err, "Error while reading config file")
		}
	}
	logs.LogStatus("Successfully read config files...")
}
