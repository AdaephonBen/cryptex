package db

import (
	"context"
	"github.com/npalladium/cryptex/server/pkg/logs"
)

type LeaderboardUser struct {
	Rank           int      `json:"rank"`
	Username       string   `json:"username"`
	QuestionNumber int      `json:"question_number"`
	Lifelines      []string `json:"user_lifelines"`
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
	_, err := DB.Exec(ctx, `UPDATE "User" SET question_number = question_number + 1, last_modified = now() WHERE email_id=$1`, email)
	if err != nil {
		logs.LogWarning(err, "Unable to increment user level")
	}
	return err
}

func AddUserLifeline(ctx context.Context, email string, lifeline string) error {
	_, err := DB.Exec(ctx, `UPDATE "User" SET lifelines = array_append(lifelines, $1) WHERE email_id=$2`, lifeline, email)
	if err != nil {
		logs.LogWarning(err, "Unable to add lifeline to user")
	}
	return err
}

func UpdateLeaderboard() {
	Leaderboard = nil
	rows, err := DB.Query(context.Background(), `SELECT username, question_number, lifelines from "User" ORDER BY question_number DESC, last_modified ASC`)
	if err != nil {
		logs.LogError(err, "Unable to update leaderboard")
	}
	defer rows.Close()
	i := 1
	for rows.Next() {
		current := new(LeaderboardUser)
		err = rows.Scan(&current.Username, &current.QuestionNumber, &current.Lifelines)
		current.Rank = i
		i++
		if err != nil {
			logs.LogError(err, "Unable to update leaderboard")
		}
		Leaderboard = append(Leaderboard, *current)
	}
	if rows.Err() != nil {
		logs.LogError(err, "Unable to update leaderboard")
	}
}

func AddUserBonusQuestion(ctx context.Context, email string, id int) error {
	_, err := DB.Exec(ctx, `UPDATE "User" SET bonus_questions = array_append(bonus_questions, $1) WHERE email_id=$2`, id, email)
	if err != nil {
		logs.LogWarning(err, "Unable to add Bonus Question to user")
	}
	return err
}
