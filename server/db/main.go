package db

import (
	"log"
	"os"

	pg "github.com/go-pg/pg"
	"github.com/joho/godotenv"
)

var (
	host,port,database,username,password string
	cfg map[string]string
)

func Connect() *pg.DB {

	if err := godotenv.Load(); err != nil {
		log.Println("File .env not found, loading config from ENV")
	}

	cfg, _ = godotenv.Read()

	host = cfg["DB_HOST"]
	port = cfg["PORT"]
	database = cfg["DATABASE"]
	username = cfg["USERNAME"]
	password = cfg["PASSWORD"]
	
	opts := &pg.Options{
		User: username,
		Password: password,
		Addr : host+":"+port,
		Database: database,
	}

var db = pg.Connect(opts)

if db == nil{
	log.Println("Failed to connect to database.")
	os.Exit(100)
}

log.Printf("Connection to database successful")
CreateUsersTable(db)
return db
}