/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"waitlister/pkg/database"
	"waitlister/pkg/server"

	"github.com/spf13/cobra"
)

// agentCmd represents the agent command
var agentCmd = &cobra.Command{
	Use:   "agent",
	Short: "A brief description of your command",
	Long:  `this is agent`,
	Run: func(cmd *cobra.Command, args []string) {

		fmt.Println("agent called")
		db, err := database.New(os.Getenv("DB_CONN_STRING"))

		if err != nil {
			fmt.Println("failed to connect to database")
			os.Exit(1)
		}

		server := server.New(server.ServerConfig{
			Database: db,
		})

		go func() {
			err = server.Start(":8080")
			if err != nil {
				fmt.Println("Failed to run service")
			}
		}()
		defer server.Close()

		cShutdown := make(chan os.Signal, 1)
		signal.Notify(cShutdown, os.Interrupt, syscall.SIGTERM)

		// wait for signal
		sig := <-cShutdown
		fmt.Println("Caught signal, shutting down", sig)
	},
}

func init() {
	rootCmd.AddCommand(agentCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// agentCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// agentCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
