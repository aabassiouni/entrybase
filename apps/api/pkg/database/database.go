package database

import (
	// "context"
	"fmt"
	// "os"
	gen "waitlister/gen/database"

	"github.com/jackc/pgx/v5"
)

type database struct {
	db    *pgx.Conn
	query *gen.Queries
}

func New(connString string)(Database, error)  {

	primary ,err := connect(connString)

	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	var db Database = &database{
		db:    primary,
		query: gen.New(primary),
	}

	
	
	return db, nil
}
// var db *pgx.Conn

// func ConnectToDb() {
//     var err error
//     connStr := "postgres://aabassiouni:3CoJqxQ2kTKl@ep-withered-glade-91314144.us-east-2.aws.neon.tech/neondb"

//     db, err = pgx.Connect(context.Background(), connStr)
//     if err != nil {
//         panic(fmt.Sprintf("Unable to connect to database: %v\n", err))
//     }
// 	fmt.Println("Connected to database")
// }

// func GetSignups(){
// 	// var names []string
// 	var err error
// 	var test string
// 	err = db.QueryRow(context.Background(), "select 'Hello, world!'").Scan(&test)

// 	// fmt.Println(rows)
// 	if err != nil {
// 		panic(err)
// 	}
// 	// defer rows.Close()
// 	// for rows.Next() {
// 	// 	var name string
// 	// 	if err := rows.Scan(&name); err != nil {
// 	// 		return nil, err
// 	// 	}
// 	// 	names = append(names, name)
// 	// }
// 	// err = rows.Err()
// 	if err != nil {
// 		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
// 		os.Exit(1)
// 	}
// 	fmt.Println(test)
// 	// return test
// }

