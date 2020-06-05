package validate

import (
	"regexp"

	"github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"github.com/npalladium/cryptex/server/pkg/schema"
)

func ValidateUser(user *schema.User) error {
	return validation.ValidateStruct(user,
		validation.Field(&user.Email_id, validation.Required, is.Email),
		validation.Field(&user.Username, validation.Required, validation.Match(regexp.MustCompile("^[a-zA-Z0-9]([._@-]|[a-zA-Z0-9]){6,29}[a-zA-Z0-9]$"))),
	)
}

func ValidateQuestionRequest(questionRequest *schema.QuestionRequest) error {
	return validation.ValidateStruct(questionRequest,
		validation.Field(&questionRequest.Email_id, validation.Required, is.Email),
	)
}
