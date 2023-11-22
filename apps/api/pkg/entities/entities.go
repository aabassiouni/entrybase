package entities

import "time"

type Signup struct {
	WaitlistID string
	UserID     string
	Email      string
	FirstName  string
	LastName   string
}

type Waitlist struct {
	WaitlistID   string
	UserID	   string
	WaitlistName string
	CreatedAt    time.Time
}

