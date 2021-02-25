package db

import (
	"context"

	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/spf13/viper"
)

var DB *pgxpool.Pool

func Init() {
	logs.LogStatus("Attempting to connect to DB...")
	postgresql_connection_string := viper.GetString("postgresql_connection_url")
	var err error
	DB, err = pgxpool.Connect(context.Background(), postgresql_connection_string)
	if err != nil {
		logs.LogError(err, "Unable to connect to DB")
	}
	if viper.GetBool("create_tables") {
		logs.LogStatus("Creating tables...")
		_, errCreateDB := DB.Exec(context.Background(), Schema)
		if errCreateDB != nil {
			logs.LogError(errCreateDB, "Unable to create tables")
		}
		logs.LogStatus("Created tables. ")
	}
	logs.LogStatus("Successfully connected to DB. ")
}
