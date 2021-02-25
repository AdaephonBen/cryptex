package db

import (
	"context"
	"github.com/npalladium/cryptex/server/pkg/logs"
)

func CreateNewQuestion(ctx context.Context, question_number int, question string, question_type int, answer string, req_score int) error {
	_, err := DB.Exec(ctx, `insert into "Question" (question_number, question, question_type, answer, req_score) VALUES ($1, $2, $3, $4, $5)`, question_number, question, question_type, answer, req_score)
	if err != nil {
		logs.LogWarning(err, "Unable to create new question")
	}
	return err
}
