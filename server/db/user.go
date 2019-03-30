package db

import (
	"log"

	orm "github.com/go-pg/pg/orm"
	pg	"github.com/go-pg/pg"
)

type User struct {
	UserID		   int	`sql:"user_id,serial,pk"` 
	Email		string	`json:"email" sql:"email,unique"`
	Username	string	`json:"username" sql:"username,unique"`
	Password	string  `json:"password" sql:"password,unique"`
	Address		string	`json:"address" sql:"address"`	
	City		string	`json:"city" sql:"city"`
	State		string  `json:"state" sql:"state"`
	Zipcode 	string  `json:"zipcode" sql:"zip"`
}

func CreateUsersTable(db *pg.DB) error {

	opts := &orm.CreateTableOptions{
		IfNotExists: true,
	}
	err := db.CreateTable(&User{}, opts)
	if err != nil {
		log.Printf("Error creating users table, Reason: %v\n", err)
		return err
	}
	return nil
}

func (u *User) CreateAccount(db *pg.DB) error{
	
	defer db.Close()
	err := db.Insert(u)
	if err!= nil {
		log.Printf("Error: %v\n",err)
		return err
	}
	log.Printf(" %s successfully signed up.\n", u.Username)
	return nil
}

func (u *User) FindUserByUsername(db *pg.DB) (*User, error){

	defer db.Close()

	err:= db.Model(u).Where("username=?username").Select(u)
		if err != nil {
		log.Printf("error finding user by username:  %v\n", err)
		return nil, err
	}
	log.Printf("User found : %v\n",*u)
	return u, nil
}