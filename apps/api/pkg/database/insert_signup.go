package database

import (
	"context"
	"fmt"
	gen "waitlister/gen/database"
	"waitlister/pkg/entities"

	"github.com/jackc/pgx/v5/pgtype"
)


func (db *database) InsertSignup(ctx context.Context, signup entities.Signup) error {

	req := transformSignupTypeToInsertSignupParams(signup)

	err := db.query.InsertSignupQuery(ctx, req)

	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil

}

func transformSignupTypeToInsertSignupParams(signup entities.Signup) gen.InsertSignupQueryParams {
	return gen.InsertSignupQueryParams{
		WaitlistID: signup.WaitlistID,
		Email:      signup.Email,
		FirstName:  pgtype.Text{String: signup.FirstName, Valid: signup.FirstName != ""},
		LastName:   pgtype.Text{String: signup.LastName, Valid: signup.LastName != ""},
	}
}
