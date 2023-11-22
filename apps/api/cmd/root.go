/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/spf13/cobra"
)


var (
	dotEnvPath string
)
// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "waitlister",
	Short: "A brief description of your application",
	Long: `A longer description  `,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	// Run: func(cmd *cobra.Command, args []string) { }
	PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
		if dotEnvPath != "" {
			fmt.Printf("Loading environment variables from %s\n", dotEnvPath)
			err := godotenv.Load(dotEnvPath)
			if err != nil {
				return err
			}
		}
		return nil
	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.

	// rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.api.yaml)")

	// Cobra also supports local flags, which will only run
	// when this action is called directly.
	rootCmd.PersistentFlags().StringVarP(&dotEnvPath, "env", "e", ".env", "Path to a .env file")
}


