package auth

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/auth0/go-jwt-middleware"
	"github.com/form3tech-oss/jwt-go"
	"github.com/npalladium/cryptex/server/pkg/logs"
	"github.com/spf13/viper"
)

type Response struct {
	Message string `json:"message"`
}

type Jwks struct {
	Keys []JSONWebKeys `json:"keys"`
}

type JSONWebKeys struct {
	Kty string   `json:"kty"`
	Kid string   `json:"kid"`
	Use string   `json:"use"`
	N   string   `json:"n"`
	E   string   `json:"e"`
	X5c []string `json:"x5c"`
}

var jwks Jwks

func DownloadJWKS() {
	resp, err := http.Get(viper.GetString("auth0_jwks"))
	if err != nil {
		logs.LogError(err, "Unable to retrieve Auth0 JWKS")
	}
	defer resp.Body.Close()
	err = json.NewDecoder(resp.Body).Decode(&jwks)

	if err != nil {
		logs.LogError(err, "Unable to parse Auth0 JWKS")
	}
}

func Init() *jwtmiddleware.JWTMiddleware {
	DownloadJWKS()
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			// Verify 'aud' claim
			aud := token.Claims.(jwt.MapClaims)["aud"].([]interface{})

			s := make([]string, len(aud))
			for i, v := range aud {
				s[i] = fmt.Sprint(v)
			}
			token.Claims.(jwt.MapClaims)["aud"] = s

			checkAud := token.Claims.(jwt.MapClaims).VerifyAudience(viper.GetString("AUTH0_IDENTIFIER"), false)
			if !checkAud {
				return token, errors.New("Invalid audience")
			}
			// Verify 'iss' claim
			iss := viper.GetString("auth0_iss")
			checkIss := token.Claims.(jwt.MapClaims).VerifyIssuer(iss, false)
			if !checkIss {
				return token, errors.New("Invalid issuer.")
			}

			cert, err := getPemCert(token)
			if err != nil {
				logs.LogError(err, "Unable to retrieve Auth0 JWKS")
			}

			result, _ := jwt.ParseRSAPublicKeyFromPEM([]byte(cert))
			return result, nil
		},
		SigningMethod: jwt.SigningMethodRS256,
	})
	return jwtMiddleware
}

func getPemCert(token *jwt.Token) (string, error) {
	cert := ""
	for k, _ := range jwks.Keys {
		if token.Header["kid"] == jwks.Keys[k].Kid {
			cert = "-----BEGIN CERTIFICATE-----\n" + jwks.Keys[k].X5c[0] + "\n-----END CERTIFICATE-----"
		}
	}

	if cert == "" {
		err := errors.New("Unable to find appropriate key.")
		return cert, err
	}

	return cert, nil
}

func GetEmail(ctx context.Context) string {
	user := ctx.Value("user")
	email := user.(*jwt.Token).Claims.(jwt.MapClaims)["https://cryptex.elan.org.in/email"].(string)
	return email
}
