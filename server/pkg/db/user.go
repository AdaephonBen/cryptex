package db

import (
	"context"
	"github.com/npalladium/cryptex/server/pkg/logs"
)

func SetTeamID(ctx context.Context, team_id int, user_id int) {
	_, err := DB.Exec(ctx, `update "User" set team_id=$1, latest_team_mod=NOW() where id=$2`, team_id, user_id)
	if err != nil {
		logs.LogWarning(err, "Unable to set Team ID for user")
	}
}
