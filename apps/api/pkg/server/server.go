package server

import (
	"context"
	"fmt"
	"time"

	"waitlister/pkg/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type ServerConfig struct {
	Database database.Database
}

type Server struct {
	app *fiber.App
	db  database.Database
}

func New(serverConfig ServerConfig) *Server {

	server := &Server{
		app: fiber.New(),
		db:  serverConfig.Database,
	}
	server.app.Use(cors.New())
	server.app.Post("/v1/signup", server.v1InsertSignup)

	return server
}

func (s *Server) Start(addr string) error {
	err := s.app.Listen(addr)
	if err != nil {
		return fmt.Errorf("api server error: %s", err.Error())
	}
	return nil
}

func (s *Server) Close() error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()
	fmt.Println("stopping..")
	defer fmt.Println("stopped")
	return s.app.Server().ShutdownWithContext(ctx)
}
