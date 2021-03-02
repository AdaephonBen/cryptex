package db

import (
	"context"
	"github.com/npalladium/cryptex/server/pkg/logs"
)

type LeaderboardUser struct {
	Username       string `json:"username"`
	QuestionNumber int    `json:"question_number"`
}

var Leaderboard []LeaderboardUser

func CreateNewUser(ctx context.Context, username string, email string) error {
	_, err := DB.Exec(ctx, `INSERT INTO "User" (email_id, username) VALUES ($1, $2)`, email, username)
	if err != nil {
		logs.LogWarning(err, "Unable to create new user")
	}
	return err
}

func IncrementUserLevel(ctx context.Context, email string) error {
	_, err := DB.Exec(ctx, `UPDATE "User" SET question_number = question_number + 1 WHERE email_id=$1`, email)
	if err != nil {
		logs.LogWarning(err, "Unable to increment user level")
	}
	return err
}

func UpdateLeaderboard() {
	Leaderboard = nil
	rows, err := DB.Query(context.Background(), `SELECT username, question_number from "User" ORDER BY question_number DESC, last_modified ASC`)
	if err != nil {
		logs.LogError(err, "Unable to update leaderboard")
	}
	defer rows.Close()
	for rows.Next() {
		current := new(LeaderboardUser)
		err = rows.Scan(&current.Username, &current.QuestionNumber)
		if err != nil {
			logs.LogError(err, "Unable to update leaderboard")
		}
		Leaderboard = append(Leaderboard, *current)
	}
	if rows.Err() != nil {
		logs.LogError(err, "Unable to update leaderboard")
	}
}
