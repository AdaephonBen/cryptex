package db

import (
	"context"
	"errors"
	"fmt"

	"github.com/npalladium/cryptex/server/pkg/logs"
)

func Find(slice []string, val string) (int, bool) {
	for i, item := range slice {
		if item == val {
			return i, true
		}
	}
	return -1, false
}

func GetLifeline(ctx context.Context, id int) (string, error) {
	var lifeline string
	err := DB.QueryRow(ctx, `SELECT l.lifeline from "Lifeline" l JOIN "BonusQuestion" q ON q.lifeline_id = l.id WHERE q.id = $1`, id).Scan(&lifeline)
	if err != nil {
		logs.LogWarning(err, "Unable to retreive Lifeline")
		return "", err
	}
	return lifeline, nil
}

func CheckLifeline(ctx context.Context, email_id string, lifeline string) (string, error) {
	var lifelines []string
	fmt.Println(lifeline)
	err := DB.QueryRow(ctx, `SELECT lifelines from "User" WHERE email_id=$1`, email_id).Scan(&lifelines)
	if err != nil {
		logs.LogWarning(err, "unable to retreieve lifelines")
		return "", err
	}
	index, isFound := Find(lifelines, lifeline)
	if !isFound {
		return "", errors.New("Lifeline not found")
	}
	question, err := GetQuestion(ctx, email_id)
	QuestionNumber := question.Question_number
	var initial_question, final_question int
	err = DB.QueryRow(ctx, `SELECT initial_question, final_question from "Lifeline" where lifeline=$1`, lifeline).Scan(&initial_question, &final_question)
	if err != nil {
		return "", err
	}
	if !(QuestionNumber >= initial_question && QuestionNumber <= final_question) {
		return "", errors.New("Lifeline not valid for this question")
	}
	lifelines[index] = lifelines[len(lifelines)-1]
	lifelines[len(lifelines)-1] = ""
	lifelines = lifelines[:len(lifelines)-1]
	_, err = DB.Exec(ctx, `UPDATE "User" set lifelines=$1 where email_id=$2`, lifelines, email_id)
	if err != nil {
		logs.LogWarning(err, "Unable to delete lifeline")
		return "", err
	}
	if lifeline == "Skip Question" {
		IncrementUserLevel(ctx, email_id)
	} else if lifeline == "Get Hint" {
		hint, err := GetLatestUnreleasedHint(ctx, QuestionNumber)
		if err != nil {
			logs.LogWarning(err, "unable to get hint")
			return "", err
		}
		return hint, nil
	}
	return "", nil
}

func GetAvailableLifelines(ctx context.Context, email_id string) ([]string, error) {
	var lifelines []string
	var final_lifelines []string
	err := DB.QueryRow(ctx, `SELECT lifelines from "User" WHERE email_id=$1`, email_id).Scan(&lifelines)
	if err != nil {
		logs.LogWarning(err, "unable to retreieve lifelines")
		return nil, err
	}
	question, err := GetQuestion(ctx, email_id)
	QuestionNumber := question.Question_number
	var initial_question, final_question int
	for _, lifeline := range lifelines {
		err = DB.QueryRow(ctx, `SELECT initial_question, final_question from "Lifeline" where lifeline=$1`, lifeline).Scan(&initial_question, &final_question)
		if err != nil {
			return nil, err
		}
		if QuestionNumber >= initial_question && QuestionNumber <= final_question {
			final_lifelines = append(final_lifelines, lifeline)
		}
	}
	return final_lifelines, nil
}
