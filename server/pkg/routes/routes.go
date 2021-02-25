package routes

import (
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/npalladium/cryptex/server/pkg/auth"
	"github.com/npalladium/cryptex/server/pkg/controllers"
	"github.com/spf13/viper"
)

func Init() chi.Router {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(auth.Ab.LoadClientStateMiddleware)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{viper.GetString("root_url")},
		AllowedMethods:   []string{"GET", "POST", "DELETE"},
		AllowCredentials: true,
	})

	r.Use(c.Handler)

	r.Use(middleware.Timeout(60 * time.Second))

	r.Mount("/api/auth", http.StripPrefix("/api/auth", auth.Ab.Config.Core.Router))

	r.Route("/api", func(r chi.Router) {
		r.Route("/admin", func(r chi.Router) {
			r.Use(controllers.AdminAuthMiddleware)
			r.Post("/question", controllers.AddQuestionHandler)
		})
	})

	return r
}
