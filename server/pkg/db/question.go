package db

import (
	"context"
	"crypto/sha256"
	"errors"
	"fmt"

	"github.com/npalladium/cryptex/server/pkg/logs"
)

type Question struct {
	Id              int                    `json:"question_id"`
	Question_number int                    `json:"question_number"`
	Question        map[string]interface{} `json:"question"`
	Question_type   int                    `json:"question_type"`
}

func getHash(answer string) string {
	checksum_answer := sha256.Sum256([]byte(answer))
	answer_hash := fmt.Sprintf("%x", checksum_answer)
	return answer_hash
}

func CreateNewQuestion(ctx context.Context, question_number int, question map[string]interface{}, question_type int, answer string) error {
	answer_hash := getHash(answer)
	_, err := DB.Exec(ctx, `insert into "Question" (question_number, question, question_type, answer) VALUES ($1, $2, $3, $4)`, question_number, question, question_type, answer_hash)
	if err != nil {
		logs.LogWarning(err, "Unable to create new question")
	}
	return err
}

func GetAllQuestions(ctx context.Context) ([]Question, error) {
	rows, err := DB.Query(ctx, `SELECT id, question_number, question, question_type FROM "Question"`)
	if err != nil {
		logs.LogWarning(err, "Unable to retrieve all questions")
		return nil, err
	}
	var questions []Question
	defer rows.Close()
	for rows.Next() {
		var current_question Question
		err = rows.Scan(&current_question.Id, &current_question.Question_number, &current_question.Question, &current_question.Question_type)
		if err != nil {
			logs.LogWarning(err, "Unable to parse question")
			return nil, err
		}
		questions = append(questions, current_question)
	}
	if rows.Err() != nil {
		logs.LogWarning(rows.Err(), "Unable to retrieve all questions")
		return nil, rows.Err()
	}
	return questions, nil
}

func GetQuestion(ctx context.Context, email_id string) (Question, error) {
	curr_question := new(Question)
	err := DB.QueryRow(ctx, `SELECT q.id, q.question_number, q.question, q.question_type FROM "User" u JOIN "Question" q ON q.question_number = u.question_number WHERE u.email_id=$1`, email_id).Scan(&curr_question.Id, &curr_question.Question_number, &curr_question.Question, &curr_question.Question_type)
	if err != nil {
		logs.LogWarning(err, "Unable to query question")
		return Question{}, err
	}
	return *curr_question, nil
}

func CheckAnswer(ctx context.Context, email_id string, answer string) error {
	answer_hash := getHash(answer)
	var db_answer_hash string
	err := DB.QueryRow(ctx, `SELECT q.answer FROM "User" u JOIN "Question" q ON q.question_number = u.question_number WHERE u.email_id=$1`, email_id).Scan(&db_answer_hash)
	if err != nil {
		return err
	}
	if answer_hash == db_answer_hash {
		return nil
	}
	return errors.New("Incorrect Answer")
}
