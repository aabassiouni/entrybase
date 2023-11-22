-- name: InsertSignupQuery :exec

INSERT INTO signups (waitlist_id, email, first_name, last_name)
VALUES (@waitlist_id,
        @email,
        @first_name,
        @last_name) ;

