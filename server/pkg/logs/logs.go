package logs

import (
	"os"

	log "github.com/sirupsen/logrus"
)

// All logging is to stdout for now.

func Init() {
	log.SetOutput(os.Stdout)
}

func LogAnswer(answer string, username string, level int) {
	log.WithFields(log.Fields{
		"answer":   answer,
		"username": username,
		"level":    level,
	}).Info("New Answer")
}

func LogCorrectAnswer(answer string, username string, level int) {
	log.WithFields(log.Fields{
		"answer":   answer,
		"username": username,
		"level":    level,
	}).Info("New Correct Answer")
}

func LogError(message string, errorToLog error) {
	log.WithError(errorToLog).Fatal(message)
}

func LogStatus(message string) {
	log.Info(message)
}

func LogWarning(message string, errorToLog error) {
	log.WithFields(log.Fields{
		"error": errorToLog.Error(),
	}).Warn(message)
}

func LogUserCreationError(username string, email_id string, errorToLog error) {
	log.WithFields(log.Fields{
		"username": username,
		"email_id": email_id,
		"error":    errorToLog.Error(),
	}).Warn("Error while creating user")
}
