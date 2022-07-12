package db

import (
	"context"

	"github.com/npalladium/cryptex/server/pkg/logs"
)

func GetHints(ctx context.Context, question_number int) ([]string, error) {
	rows, err := DB.Query(ctx, `SELECT hint from "Hint" where question_number = $1 AND is_released = true ORDER BY number`, question_number)
	if err != nil {
		logs.LogWarning(err, "Unable to retrieve hints")
		return nil, err
	}
	var Hints []string
	defer rows.Close()
	for rows.Next() {
		var current_hint string
		err = rows.Scan(&current_hint)
		if err != nil {
			logs.LogWarning(err, "Unable to retrieve hints")
			return nil, err
		}
		Hints = append(Hints, current_hint)
	}
	if rows.Err() != nil {
		logs.LogWarning(err, "Unable to retrieve hints")
		return nil, rows.Err()
	}
	return Hints, nil
}

func GetLatestUnreleasedHint(ctx context.Context, question_number int) (string, error) {
	var hint string
	err := DB.QueryRow(ctx, `SELECT hint from "Hint" where question_number=$1 AND is_released=false ORDER BY number ASC LIMIT 1`, question_number).Scan(&hint)
	if err != nil {
		logs.LogWarning(err, "Unable to get hint")
		return "", err
	}
	return hint, nil
}
