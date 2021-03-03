package db

import (
	"context"
	"crypto/sha256"
	"errors"
	"fmt"
	"github.com/npalladium/cryptex/server/pkg/logs"
	"time"
)

type Question struct {
	Id              int                    `json:"question_id"`
	Question_number int                    `json:"question_number"`
	Question        map[string]interface{} `json:"question"`
	Question_type   int                    `json:"question_type"`
}

type BonusQuestion struct {
	Id                int                    `json:"bonus_question_id"`
	BonusQuestion     map[string]interface{} `json:"bonus_question"`
	BonusQuestionType int                    `json:"bonus_question_type"`
	AvailableFrom     time.Time              `json:"available_from"`
	AvailableTo       time.Time              `json:"available_to"`
	Lifeline          string                 `json:"lifeline"`
	InitialQuestion   int                    `json:"initial_question"`
	FinalQuestion     int                    `json:"final_question"`
}

func getHash(answer string) string {
	checksum_answer := sha256.Sum256([]byte(answer))
	answer_hash := fmt.Sprintf("%x", checksum_answer)
	return answer_hash
}

func inTimeSpan(start, end, check time.Time) bool {
	if start.Before(end) {
		return !check.Before(start) && !check.After(end)
	}
	if start.Equal(end) {
		return check.Equal(start)
	}
	return !start.After(check) || !end.Before(check)
}

func GetBonusQuestions(ctx context.Context, email string) ([]BonusQuestion, error) {
	var bonus_questions_id []int
	err := DB.QueryRow(ctx, `SELECT bonus_questions from "User" where email_id=$1`, email).Scan(&bonus_questions_id)
	if err != nil {
		logs.LogWarning(err, "unable to retrieve bonus questions")
		return nil, err
	}
	rows, err := DB.Query(ctx, `SELECT q.id, q.question, q.question_type, q.available_from, q.available_to, l.lifeline, l.initial_question, l.final_question FROM "BonusQuestion" q JOIN "Lifeline" l ON l.id=q.lifeline_id where q.available_from <= now() and now() <= q.available_to and (select q.id != ALL($1))`, bonus_questions_id)
	if err != nil {
		logs.LogWarning(err, "Unable to retrieve Bonus Questions")
		return nil, err
	}
	var bonus_questions []BonusQuestion
	defer rows.Close()
	for rows.Next() {
		var current_question BonusQuestion
		err = rows.Scan(&current_question.Id, &current_question.BonusQuestion, &current_question.BonusQuestionType, &current_question.AvailableFrom, &current_question.AvailableTo, &current_question.Lifeline, &current_question.InitialQuestion, &current_question.FinalQuestion)
		if err != nil {
			logs.LogWarning(err, "Unable to retrieve Bonus Questions")
			return nil, err
		}
		bonus_questions = append(bonus_questions, current_question)
	}
	if rows.Err() != nil {
		logs.LogWarning(rows.Err(), "Unable to retrieve Bonus Questions")
		return nil, rows.Err()
	}
	return bonus_questions, nil
}

func CheckBonusAnswer(ctx context.Context, id int, answer string) error {
	answer_hash := getHash(answer)
	var db_answer_hash string
	var available_from, available_to time.Time
	err := DB.QueryRow(ctx, `SELECT answer, available_from, available_to FROM "BonusQuestion" WHERE id=$1`, id).Scan(&db_answer_hash, &available_from, &available_to)
	if !inTimeSpan(available_from, available_to, time.Now()) {
		return errors.New("Out of time span")
	}
	if err != nil {
		return err
	}
	if answer_hash == db_answer_hash {
		return nil
	}
	return errors.New("Incorrect Answer")
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
	fmt.Println(email_id)
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
