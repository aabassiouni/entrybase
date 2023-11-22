package database

import (
	"context"
	"waitlister/pkg/entities"
)

type Database interface {

	// Signups
	InsertSignup(ctx context.Context, signup entities.Signup) error

	// Stuff
	// Close() error
}
