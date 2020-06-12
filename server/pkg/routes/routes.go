package routes

import (
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/npalladium/cryptex/server/pkg/auth"
)

func Init() chi.Router {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(auth.Ab.LoadClientStateMiddleware)

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"lambda.fail"},
		AllowedMethods: []string{"GET", "POST", "DELETE"},
		AllowCredentials: true,
	})

	r.Use(c.Handler)

	r.Use(middleware.Timeout(60 * time.Second))

	r.Mount("/auth", http.StripPrefix("/auth", auth.Ab.Config.Core.Router))

	r.Route("/api", func(r chi.Router) {
		r.Post("/add-user", AddUserHandler)
		r.Post("/get-question", GetQuestionHandler)
		r.Get("/get-current-user", GetCurrentUserHandler)
	})

	return r
}
