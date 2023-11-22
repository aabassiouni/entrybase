package server

import (
	"fmt"
	"waitlister/pkg/entities"

	"github.com/gofiber/fiber/v2"
	// unkey "github.com/WilfredAlmeida/unkey-go/features"
)

type InsertSignupRequest struct {
	WaitlistID string `json:"waitlist_id"`
	Email      string `json:"email"`
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
}

// wt_3ZWZ21AQsfqdrSZ5cyPnN16b
func (s *Server) v1InsertSignup(c *fiber.Ctx) error {

	fmt.Println("/////////// v1InsertSignup ///////////")
	ctx := c.UserContext()

	var req InsertSignupRequest;
	err := c.BodyParser(&req)
	
	if err != nil {
		fmt.Println("error parsing request body", err)
		return c.Status(400).JSON(fiber.Map{"error": "Bad Request", "message": "cannot parse request body"})
	}


	if err != nil {
		return err
	}

	err = s.db.InsertSignup(ctx, entities.Signup{
		WaitlistID: req.WaitlistID,
		Email:      req.Email,
		FirstName:  req.FirstName,
		LastName:   req.LastName,
	})

	if err != nil {
		fmt.Println("error inserting signup", err)
		return c.Status(500).JSON(fiber.Map{"error": "Internal Server Error"})
	}

	return c.JSON(fiber.Map{"message": "success"})
}
