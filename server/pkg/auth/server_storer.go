package auth

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/volatiletech/authboss"
	aboauth "github.com/volatiletech/authboss/oauth2"
)

type DatabaseStorer struct {
	authboss.CreatingServerStorer
	DB *pgxpool.Pool
}

func (d DatabaseStorer) Load(ctx context.Context, key string) (authboss.User, error) {
	// Check to see if our key is actually an oauth2 pid
	provider, uid, err := authboss.ParseOAuth2PID(key)

	var u User

	if err == nil {

		err := d.DB.QueryRow(ctx, `select * from "User" where OAuth2Provider = $1 and OAuth2UID = $2`, provider, uid).Scan(&u.ID, &u.Email, &u.Password, &u.RecoverSelector, &u.RecoverVerifier, &u.RecoverTokenExpiry, &u.OAuth2UID, &u.OAuth2Provider, &u.OAuth2AccessToken, &u.OAuth2RefreshToken, &u.OAuth2Expiry)

		if err != nil {
			return nil, authboss.ErrUserNotFound
		}

		return &u, nil
	}

	err = d.DB.QueryRow(ctx, `select * from "User" where email_id=$1`, key).Scan(&u.ID, &u.Email, &u.Password, &u.RecoverSelector, &u.RecoverVerifier, &u.RecoverTokenExpiry, &u.OAuth2UID, &u.OAuth2Provider, &u.OAuth2AccessToken, &u.OAuth2RefreshToken, &u.OAuth2Expiry)

	if err != nil {
		return nil, authboss.ErrUserNotFound
	}

	return &u, nil
}

func (d DatabaseStorer) New(_ context.Context) authboss.User {
	return &User{}
}

func (d DatabaseStorer) Create(ctx context.Context, user authboss.User) error {
	u := user.(*User)
	var team_id int

	err := d.DB.QueryRow(ctx, `insert into "Team" (name) VALUES ($1) RETURNING id`, u.Username).Scan(&team_id)

	if err != nil {
		return err
	}

	_, err = d.DB.Exec(ctx, `insert into "User" (id, email_id, username, password, recover_selector, recover_verifier, recover_token_expiry, oauth2_uid, oauth2_provider, oauth2_access_token, oauth2_refresh_token, oauth2_expiry, team_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`, u.ID, u.Email, u.Username, u.Password, u.RecoverSelector, u.RecoverVerifier, u.RecoverTokenExpiry, u.OAuth2UID, u.OAuth2Provider, u.OAuth2AccessToken, u.OAuth2RefreshToken, u.OAuth2Expiry, team_id)

	if err != nil {
		logs.LogWarning(err, "Unable to create user")
		return authboss.ErrUserFound
	}

	return nil
}

func (d DatabaseStorer) Save(ctx context.Context, user authboss.User) error {
	u := user.(*User)

	_, err := d.DB.Exec(ctx, `update "User" set id=$1, email_id=$2, password=$3, recover_selector=$4, recover_verifier=$5, recover_token_expiry=$6, oauth2_uid=$7, oauth2_provider=$8, oauth2_access_token=$9, oauth2_refresh_token=$10, oauth2_expiry=$11 where email_id=$2`, u.ID, u.Email, u.Password, u.RecoverSelector, u.RecoverVerifier, u.RecoverTokenExpiry, u.OAuth2UID, u.OAuth2Provider, u.OAuth2AccessToken, u.OAuth2RefreshToken, u.OAuth2Expiry)

	if err != nil {
		return authboss.ErrUserNotFound
	}

	return nil
}

func (d DatabaseStorer) LoadByRecoverSelector(ctx context.Context, selector string) (user authboss.RecoverableUser, err error) {
	var u User

	err = d.DB.QueryRow(ctx, `select * from "User" where recover_selector=$1`, selector).Scan(&u.ID, &u.Email, &u.Password, &u.RecoverSelector, &u.RecoverVerifier, &u.RecoverTokenExpiry, &u.OAuth2UID, &u.OAuth2Provider, &u.OAuth2AccessToken, &u.OAuth2RefreshToken, &u.OAuth2Expiry)

	if err != nil {
		return nil, authboss.ErrUserNotFound
	}

	return &u, nil
}

func (d DatabaseStorer) AddRememberToken(ctx context.Context, pid, token string) error {
	_, err := d.DB.Exec(ctx, `update "TokensAuthboss" SET tokens = tokens || $1 WHERE email=$2`, token, pid)
	if err != nil {
		return err
	}
	return nil
}

func (d DatabaseStorer) DelRememberTokens(ctx context.Context, pid string) error {
	_, err := d.DB.Exec(ctx, `update "TokensAuthboss" SET tokens = array[]::text[] WHERE pid=$1`, pid)
	if err != nil {
		return err
	}
	return nil
}

func (d DatabaseStorer) UseRememberToken(ctx context.Context, pid, token string) error {
	_, err := d.DB.Exec(ctx, `update "TokensAuthboss" SET tokens = ARRAY_REMOVE(tokens, $1) WHERE email=$2`, token, pid)
	if err != nil {
		return authboss.ErrTokenNotFound
	}
	return nil
}

func (d DatabaseStorer) NewFromOAuth2(ctx context.Context, provider string, details map[string]string) (authboss.OAuth2User, error) {
	switch provider {
	case "google":
		email := details[aboauth.OAuth2Email]

		var user *User

		var u User

		err := d.DB.QueryRow(ctx, `select * from "User" where email_id=$1`, email).Scan(&u.ID, &u.Email, &u.Password, &u.RecoverSelector, &u.RecoverVerifier, &u.RecoverTokenExpiry, &u.OAuth2UID, &u.OAuth2Provider, &u.OAuth2AccessToken, &u.OAuth2RefreshToken, &u.OAuth2Expiry)

		if err != nil {
			user = &User{}
		}

		user = &u

		// Google OAuth2 doesn't allow us to fetch real name without more complicated API calls
		// in order to do this properly in your own app, look at replacing the authboss oauth2.GoogleUserDetails
		// method with something more thorough.
		user.Email = details[aboauth.OAuth2Email]
		user.Username = user.Email
		user.OAuth2UID = details[aboauth.OAuth2UID]

		return user, nil
	}

	return nil, fmt.Errorf("unknown provider %s", provider)
}

// SaveOAuth2 user
func (d DatabaseStorer) SaveOAuth2(ctx context.Context, user authboss.OAuth2User) error {
	u := user.(*User)
	var team_id int

	err := d.DB.QueryRow(ctx, `insert into "Team" (name) VALUES ($1) RETURNING id`, u.Username).Scan(&team_id)

	if err != nil {
		return err
	}
	_, err = d.DB.Exec(ctx, `insert into "User" (id, email_id, password, recover_selector, recover_verifier, recover_token_expiry, oauth2_uid, oauth2_provider, oauth2_access_token, oauth2_refresh_token, oauth2_expiry, username, team_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) ON CONFLICT (email_id) DO update SET id=$1, email_id=$2, password=$3, recover_selector=$4, recover_verifier=$5, recover_token_expiry=$6, oauth2_uid=$7, oauth2_provider=$8, oauth2_access_token=$9, oauth2_refresh_token=$10, oauth2_expiry=$11, username=$12, team_id=$13`, u.ID, u.Email, u.Password, u.RecoverSelector, u.RecoverVerifier, u.RecoverTokenExpiry, u.OAuth2UID, u.OAuth2Provider, u.OAuth2AccessToken, u.OAuth2RefreshToken, u.OAuth2Expiry, u.Username, team_id)

	if err != nil {
		return authboss.ErrUserNotFound
	}

	return nil
}

func NewDatabaseStorer(DB *pgxpool.Pool) *DatabaseStorer {
	return &DatabaseStorer{
		DB: DB,
	}
}
