package db

import (
	"context"
	"fmt"
	"time"

	"github.com/npalladium/cryptex/server/pkg/logs"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Email_id string
	Username string
	Level int
	LastModified time.Time
}

type Level struct {
	Level int
	Question string
	Answer string
}

func InsertUser(email_id string, username string) bool {
	_, err := DB.Exec(context.Background(), `insert into "User" (email_id, username, last_modified) values ($1, $2, $3`, email_id, username, time.Now())
	if (err != nil) {
		logs.LogUserCreationError(username, email_id, err)
		return false
	}
	return true
}

func GetQuestion(level int) (string, error) {
	question := ""
	rows, err := DB.Query(context.Background(), `select question from "Level" where level = $1`, level)
	if (err != nil) {
		logs.LogWarning(err, fmt.Sprintf("Failed to query question %d", level))
		return "", err
	}
	err = rows.Scan(&question)
	if (err != nil) {
		logs.LogWarning(err, fmt.Sprintf("Failed to scan question %d", level))
		return "", err
	}
	return question, nil
}

func CheckAnswer(level int, answer string) (bool, error) {
	hashedAnswer := ""
	rows, err := DB.Query(context.Background(), `select answer from "Level" where level = $1`, level)
	if (err != nil) {
		logs.LogWarning(err, fmt.Sprintf("Failed to query answer %d", level))
		return false, err
	}
	err = rows.Scan(&hashedAnswer)
	if (err != nil) {
		logs.LogWarning(err, fmt.Sprintf("Failed to scan answer %d", level))
		return false, err
	}
	if (bcrypt.CompareHashAndPassword([]byte(hashedAnswer), []byte(answer)) == nil) {
		return true, nil
	}
	return false, nil
}