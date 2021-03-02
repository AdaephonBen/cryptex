package routes

import (
	"time"

	"github.com/auth0/go-jwt-middleware"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/npalladium/cryptex/server/pkg/controllers"
	// "github.com/spf13/viper"
)

func Init(authmiddleware *jwtmiddleware.JWTMiddleware) chi.Router {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"X-PINGOTHER", "Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
	})

	r.Use(c.Handler)

	r.Use(middleware.Timeout(60 * time.Second))

	r.Route("/api", func(r chi.Router) {
		r.Route("/admin", func(r chi.Router) {
			r.Use(controllers.AdminAuthMiddleware)
			r.Post("/question", controllers.AddQuestionHandler)
			r.Get("/question", controllers.GetAllQuestionsHandler)
		})
		r.Route("/question", func(r chi.Router) {
			r.Use(authmiddleware.Handler)
			r.Get("/", controllers.GetQuestionHandler)
		})
		r.Route("/user", func(r chi.Router) {
			r.Use(authmiddleware.Handler)
			r.Post("/", controllers.NewUserHandler)
		})
		r.Get("/leaderboard", controllers.GetLeaderboardHandler)
	})

	return r
}
