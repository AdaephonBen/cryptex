package db

import (
	"context"
	"fmt"
	"time"

	"github.com/npalladium/cryptex/server/pkg/logs"
)

type User struct {
	Email_id     string
	Username     string
	Level        int
	LastModified time.Time
}

type Level struct {
	Question string
	Answer   string
}

type LeaderboardUser struct {
	Username string
	Level    int
}

var Leaderboard []LeaderboardUser
var Levels []Level

func InsertUser(email_id string, username string) bool {
	_, err := DB.Exec(context.Background(), `insert into "User" (email_id, username, last_modified) values ($1, $2, $3)`, email_id, username, time.Now())
	if err != nil {
		logs.LogUserCreationError(username, email_id, err)
		return false
	}
	return true
}

func UpdateQuestionsAndAnswers() {
	rows, err := DB.Query(context.Background(), `SELECT question, answer FROM "Level" ORDER BY level`)
	if err != nil {
		logs.LogWarning(err, "Error while updating questions and answers")
		return 
	}
	Levels = nil
	for rows.Next() {
		var level Level
		rows.Scan(&level.Question, &level.Answer)
		Levels = append(Levels, level)
	}
}

func UpdateUserProgress(email_id string) error {
	_, err := DB.Exec(context.Background(), `update "User" SET level = level + 1, last_modified = $1 WHERE email_id=$2`, time.Now(), email_id)
	if err != nil {
		logs.LogWarning(err, fmt.Sprintf("Error while updating user progress %s", email_id))
	}
	return nil
}

func UpdateLeaderboard() {
	rows, err := DB.Query(context.Background(), `SELECT username, level FROM "User" WHERE level >= 0 ORDER BY level DESC, last_modified ASC`)
	if err != nil {
		logs.LogWarning(err, "Error while sorting leaderboard")
		return 
	}
	Leaderboard = nil
	for rows.Next() {
		var leaderboardUser LeaderboardUser
		err = rows.Scan(&leaderboardUser.Username, &leaderboardUser.Level)
		if err != nil {
			logs.LogWarning(err, "Error while scanning row in leaderboard")
			return 
		}
		Leaderboard = append(Leaderboard, leaderboardUser)
	}
}

func GetLevel(email_id string) (int, error) {
	var level int
	err := DB.QueryRow(context.Background(), `SELECT level from "User" WHERE email_id = $1`, email_id).Scan(&level)
	if err != nil {
		logs.LogWarning(err, "Error while getting level of user")
		return -3, err
	}
	return level, nil
}