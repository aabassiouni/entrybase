package database

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
)

func connect(connString string) (*pgx.Conn, error) {
	ctx := context.Background()

	db, err := pgx.Connect(ctx, connString)

	if err != nil {
		return nil, fmt.Errorf("unable to connect to database: %v", err)
	}

	err = db.Ping(ctx)
	
	if err != nil {
		return nil, fmt.Errorf("unable to ping database: %v", err)
	}

	return db, nil
}
