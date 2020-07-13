package routes

import (
	"github.com/npalladium/cryptex/server/pkg/auth"
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/npalladium/cryptex/server/pkg/schema"
	"net/http"
)

func GetCurrentUserHandler(w http.ResponseWriter, r *http.Request) {
	user, err := auth.Ab.CurrentUser(r)
	if err != nil {
		if err == auth.ErrUserNotFound {
			serveJSON(w, http.StatusOK, schema.ResponseMessage{"user-not-logged-in"})
		} else {
			logs.LogError(err, "Error while checking current user")
			serveJSON(w, http.StatusInternalServerError, schema.ResponseMessage{"internal-server-error"})
		}
		return
	}
	serveJSON(w, http.StatusOK, user)
}
