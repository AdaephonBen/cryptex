package validate

import (
	"errors"
	"regexp"

	"github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"github.com/npalladium/cryptex/server/pkg/schema"
	"github.com/spf13/viper"
)

func stringEquals(str string) validation.RuleFunc {
	return func(value interface{}) error {
		s, _ := value.(string)
		if s != str {
			return errors.New("invalid credentials")
		}
		return nil
	}
}

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

func ValidateAdminCredentials(credentials *schema.AdminCredentials) error {
	return validation.ValidateStruct(credentials,
		validation.Field(&credentials.Admin_Username, validation.Required, validation.By(stringEquals(viper.GetString("admin_username")))),
		validation.Field(&credentials.Admin_Password, validation.Required, validation.By(stringEquals(viper.GetString("admin_password")))),
	)
}
