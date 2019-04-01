package db

import (
	"log"

	// orm "github.com/go-pg/pg/orm"
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

// func CreateUsersTable(db *pg.DB) error {

// 	opts := &orm.CreateTableOptions{
// 		IfNotExists: true,
// 	}
// 	err := db.CreateTable(&User{}, opts)
// 	if err != nil {
// 		log.Printf("Error creating users table, Reason: %v\n", err)
// 		return err
// 	}
// 	return nil
// }

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
	log.Printf("User found : %v\n", u.Username)
	return u, nil
}

func (u *User) GetAllProducts(db *pg.DB) ([]Product, error){
	defer db.Close()
	var products []Product

	_,err:= db.Query(&products, `SELECT * FROM products  WHERE user_id = ?`, u.UserID)
	if err != nil {
		log.Printf("error finding products belonging to:  %v\n error: %v\n", u.UserID, err)
		return nil, err
	}
	return products,nil
}

func(u *User) GetCartTotal(db *pg.DB) (int , error){
	defer db.Close()
	var total int

	_,err:= db.Query(&total, `SELECT SUM(total) FROM products WHERE user_id = ?;`, u.UserID)
	if err != nil {
		log.Printf("error getting cart total for :  %v\n error: %v\n", u.UserID, err)
		return 0, err
	}
	return total,nil
}

func(u *User) UpdateProductCount(db *pg.DB, pID string, pCount int, pTotal int) error {
	defer db.Close()

	_, err := db.Query(nil,`UPDATE products SET count = ?,total =? WHERE product_id =? AND user_id =?;`, pCount,pTotal,pID, u.UserID)
	if err != nil {
		log.Printf("error updating count for :  %v\n error: %v\n", u.UserID, err)
		return err
	}
	return nil
}

func(u *User) RemoveProduct(db *pg.DB, pID string) error {
	defer db.Close()

	_, err := db.Query(nil,`DELETE FROM products WHERE product_id =? AND user_id =?;`,pID, u.UserID)
	if err != nil {
		log.Printf("error removing :  %v\n error: %v\n", pID, err)
		return err
	}
	return nil
}

func(u *User) ClearCart(db *pg.DB) error {
	defer db.Close()

	_, err := db.Query(nil,`DELETE FROM products WHERE user_id =?;`,u.UserID)
	if err != nil {
		log.Printf("error clearing cart for  :  %v\n error: %v\n", u.Username, err)
		return err
	}
	return nil
}