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

type ResponseMessage struct {
	Message string `json:"message"`
}

type AdminCredentials struct {
	Admin_Username string `json:"username"`
	Admin_Password string `json:"password"`
}
