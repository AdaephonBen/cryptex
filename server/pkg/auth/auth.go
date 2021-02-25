package auth

import (
	"github.com/gorilla/sessions"
	"github.com/npalladium/cryptex/server/pkg/db"
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/spf13/viper"
	"github.com/volatiletech/authboss"
	abclientstate "github.com/volatiletech/authboss-clientstate"
	_ "github.com/volatiletech/authboss/auth"
	"github.com/volatiletech/authboss/defaults"
	aboauth "github.com/volatiletech/authboss/oauth2"
	_ "github.com/volatiletech/authboss/register"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"regexp"
)

var Ab *authboss.Authboss

var ErrUserNotFound = authboss.ErrUserNotFound

func Init() {
	Ab = authboss.New()

	Ab.Config.Paths.Mount = "/auth"
	Ab.Config.Paths.RootURL = viper.GetString("root_url")

	cookie_store := abclientstate.NewCookieStorer([]byte(viper.GetString("cookie_hash_key")), nil)
	cookie_store.HTTPOnly = false
	cookie_store.Secure = false

	session_store := abclientstate.NewSessionStorer(viper.GetString("session_cookie_name"), []byte(viper.GetString("session_hash_key")), nil)
	session_cookie_store := session_store.Store.(*sessions.CookieStore)

	session_cookie_store.Options.HttpOnly = false
	session_cookie_store.Options.Secure = false

	Ab.Config.Storage.Server = NewDatabaseStorer(db.DB)
	Ab.Config.Storage.SessionState = session_store
	Ab.Config.Storage.CookieState = cookie_store
	Ab.Config.Core.ViewRenderer = defaults.JSONRenderer{}

	defaults.SetCore(&Ab.Config, true, false)

	Ab.Config.Modules.LogoutMethod = "POST"

	Ab.Config.Paths.OAuth2LoginOK = viper.GetString("root_url") + "/portal"
	Ab.Config.Paths.AuthLoginOK = viper.GetString("root_url") + "/portal"

	redirector := defaults.NewRedirector(Ab.Config.Core.ViewRenderer, authboss.FormValueRedirect)
	redirector.CorceRedirectTo200 = true // Since using in API mode, map redirects to API
	Ab.Config.Core.Redirector = redirector

	emailRule := defaults.Rules{
		FieldName: "email", Required: true,
		MatchError: "Must be a valid e-mail address",
		MustMatch:  regexp.MustCompile(`.*@.*\.[a-z]+`),
	}

	passwordRule := defaults.Rules{
		FieldName: "password", Required: true,
		MinLength: 4,
	}

	usernameRule := defaults.Rules{
		FieldName: "username", Required: true,
		MatchError: "Must be a valid username. ",
		MustMatch:  regexp.MustCompile("^[a-zA-Z0-9]([._@-]|[a-zA-Z0-9]){6,29}[a-zA-Z0-9]$"),
	}

	Ab.Config.Core.BodyReader = defaults.HTTPBodyReader{
		ReadJSON:    true,
		UseUsername: false,
		Rulesets: map[string][]defaults.Rules{
			"login":    {emailRule},
			"register": {emailRule, passwordRule, usernameRule},
		},
		Whitelist: map[string][]string{ // for arbitrary values to not get filtered
			"register": {"email", "username"},
		},
	}

	// oauthcreds := struct {
	// 	ClientID     string `toml:"client_id"`
	// 	ClientSecret string `toml:"client_secret"`
	// }{}

	// _, err := toml.DecodeFile("oauth2.toml", &oauthcreds)
	// if err == nil && len(oauthcreds.ClientID) != 0 && len(oauthcreds.ClientSecret) != 0 {

	// fmt.Println("oauth2.toml exists, configuring google oauth2")

	Ab.Config.Modules.OAuth2Providers = map[string]authboss.OAuth2Provider{
		"google": {
			OAuth2Config: &oauth2.Config{
				ClientID:     viper.GetString("google_client_id"),
				ClientSecret: viper.GetString("google_client_secret"),
				Scopes:       []string{`profile`, `email`, `openid`},
				Endpoint:     google.Endpoint,
			},
			FindUserDetails: aboauth.GoogleUserDetails,
		},
	}
	// } else if os.IsNotExist(err) {
	// 	fmt.Println("oauth2.toml doesn't exist, not registering oauth2 handling")
	// } else {
	// 	fmt.Println("error loading oauth2.toml:", err)
	// }

	if err := Ab.Init(); err != nil {
		logs.LogError(err, "Error while initializing Authboss")
	}
}
