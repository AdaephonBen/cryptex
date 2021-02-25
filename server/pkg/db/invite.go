package db

import (
	"context"
	"github.com/npalladium/cryptex/server/pkg/logs"
)

func CreateInvite(ctx context.Context, team_id int, user_id int) {
	_, err := DB.Exec(ctx, `insert into "Invite" (team_id, user_id) values ($1, $2)`, team_id, user_id)
	if err != nil {
		logs.LogWarning(err, "Unable to create invite")
	}
}

func DeleteInvite(ctx context.Context, invite_id int) {
	_, err := DB.Exec(ctx, `update "Invite" set is_deleted=TRUE where id=$1`, invite_id)
	if err != nil {
		logs.LogWarning(err, "Unable to delete invite")
	}
}
