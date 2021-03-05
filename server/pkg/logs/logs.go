package logs

import (
	log "github.com/sirupsen/logrus"
	"os"
	"strconv"
	"time"
)

var Files []*os.File
var correctFile *os.File
var bonusFile *os.File

// All logging is to stdout for now.

func String(n int32) string {
	buf := [11]byte{}
	pos := len(buf)
	i := int64(n)
	signed := i < 0
	if signed {
		i = -i
	}
	for {
		pos--
		buf[pos], i = '0'+byte(i%10), i/10
		if i == 0 {
			if signed {
				pos--
				buf[pos] = '-'
			}
			return string(buf[pos:])
		}
	}
}

func Init() {
	log.SetOutput(os.Stdout)
	numberQuestions := 28
	var err error
	for i := 0; i < numberQuestions; i++ {
		var theLevelFile *os.File
		theLevelFile, err = os.OpenFile(strconv.Itoa(i)+".csv", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			LogError(err, "Unable to open question files")
		}
		Files = append(Files, theLevelFile)
	}
	correctFile, err = os.OpenFile("correct.csv", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		LogError(err, "Unable to open question files")
	}
	bonusFile, err = os.OpenFile("correct.csv", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		LogError(err, "Unable to open question files")
	}
}

func WriteToFile(level int, username string, answer string, isCorrect bool, attemptTimestamp time.Time) {
	if _, err := Files[level].WriteString(strconv.Itoa(level) + ", " + string(username) + ", " + string(answer) + ", " + strconv.FormatBool(isCorrect) + ", " + String(int32(attemptTimestamp.Unix())) + "\n"); err != nil {
		LogWarning(err, "Unable to log to file")
	}
	if isCorrect {
		if _, err := correctFile.WriteString(strconv.Itoa(level) + ", " + string(username) + ", " + String(int32(attemptTimestamp.Unix())) + "\n"); err != nil {
			LogWarning(err, "Unable to log to file")
		}
	}
}

func WriteToBonusFile(level int, username string, answer string, isCorrect bool, attemptTimestamp time.Time) {
	if _, err := bonusFile.WriteString(strconv.Itoa(level) + ", " + string(username) + ", " + string(answer) + ", " + strconv.FormatBool(isCorrect) + ", " + String(int32(attemptTimestamp.Unix())) + "\n"); err != nil {
		LogWarning(err, "Unable to log to file")
	}
	if isCorrect {
		if _, err := correctFile.WriteString("Bonus:" + strconv.Itoa(level) + ", " + string(username) + ", " + String(int32(attemptTimestamp.Unix())) + "\n"); err != nil {
			LogWarning(err, "Unable to log to file")
		}
	}
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

func LogError(errorToLog error, message string) {
	log.WithError(errorToLog).Fatal(message)
}

func LogStatus(message string) {
	log.Info(message)
}

func LogWarning(errorToLog error, message string) {
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
