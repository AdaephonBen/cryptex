package schema

type User struct {
	Username string `json:"username"`
	Email_id string `json:"email_id"`
}

type QuestionRequest struct {
	Email_id string `json:"email_id"`
}

type QuestionResponse struct {
	Level    int    `json:"level"`
	Question string `json:"question"`
}

type ResponseError struct {
	Error string `json:"error"`
}

type ResponseSuccess struct {
	Message string `json:"message"`
}

type AnswerRequest struct{
	Email_id string `json:"email_id"`
	Answer   string `json:"answer"`
}

type AnswerResponse struct{
	Message  string `json:message`
}