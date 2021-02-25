package db

import (
	"context"
	"github.com/npalladium/cryptex/server/pkg/logs"
)

func CreateTeam(ctx context.Context, team_name string, team_score int) {
	_, err := DB.Exec(ctx, `insert into "Team" (name, score) values ($1, $2)`, team_name, team_score)
	if err != nil {
		logs.LogWarning(err, "Unable to create team")
	}
}

func IncrementTeamSize(ctx context.Context, team_id int) {
	_, err := DB.Exec(ctx, `update "Team" set size = size + 1 where team_id=$1`, team_id)
	if err != nil {
		logs.LogWarning(err, "Unable to increment team size")
	}
}

func DecrementTeamSize(ctx context.Context, team_id int) {
	_, err := DB.Exec(ctx, `update "Team" set size = size - 1 where team_id=$1`, team_id)
	if err != nil {
		logs.LogWarning(err, "Unable to decrement team size")
	}
}

func DeleteIndividualTeam(ctx context.Context, team_id int) {
	_, err := DB.Exec(ctx, `update "Team" set is_deleted=TRUE where team_id=$1`, team_id)
	if err != nil {
		logs.LogWarning(err, "Unable to delete single user team")
	}
}

func DeleteTeam(ctx context.Context, team_id int) {
	_, err := DB.Exec(ctx, `delete from "Team" where team_size=0 and team_id=$1`, team_id)
	if err != nil {
		logs.LogWarning(err, "Unable to delete team")
	}
}

func GetTeamID(ctx context.Context, team_name string) int {
	var team_id int
	err := DB.QueryRow(ctx, `select id from "team" where name=$1`, team_name).Scan(&team_id)
	if err != nil {
		logs.LogWarning(err, "Unable to get team_id for that team name")
	}
	return team_id
}

func UpdateTeamProgress(ctx context.Context, team_score int) {
	_, err := DB.Exec(ctx, `update "Team" set score = $1, latest_ans_mod = NOW()`, team_score)
	if err != nil {
		logs.LogWarning(err, "Unable to update team progress")
	}
}
