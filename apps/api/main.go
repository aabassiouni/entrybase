package main

import (
	// "fmt"
	// "api/database"
	// "fmt"
	// "log"
	// "os"
	"waitlister/cmd"
	// "github.com/gofiber/fiber/v2"
)

// func getSignups(){
// 	func(c *fiber.Ctx) error {
// 		users, err := database.GetUsers()
// 		if err != nil {
// 			return c.Status(500).JSON(fiber.Map{"error": "Internal Server Error"})
// 		}
// 		return c.JSON(users)
// 	})

// }

func main() {
	// os.Getenv("DB_CONN_STRING")
	// fmt.Println(os.Getenv("DB_CONN_STRING"))
	// app := fiber.New()
	// // database.ConnectToDb()


	
	// app.Get("/", func(c *fiber.Ctx) error {
	// 	return c.SendString("Hello, World 👋!")
	// })
	// app.Post("/signup",func(c *fiber.Ctx) error {
	// 	database.GetSignups()
	// 	// if err != nil {
	// 	// 	return c.Status(500).JSON(fiber.Map{"error": "Internal Server Error"})
	// 	// }
	// 	return c.JSON(fiber.Map{"message": "success"})
	// }) 

	// log.Fatal(app.Listen(":3001"))
	cmd.Execute()
}