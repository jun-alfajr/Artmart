package main

import (
	"net/http" 
	"strings"
	"fmt"
	"io/ioutil"
	"encoding/json"
	"time"
	"strconv"

	"github.com/gorilla/securecookie"
	"golang.org/x/crypto/bcrypt"

	db "./db"
	pg	"github.com/go-pg/pg"
)

var cookieHandler = securecookie.New(securecookie.GenerateRandomKey(64),securecookie.GenerateRandomKey(32))

func setSession(u *db.User, w http.ResponseWriter){
	value := map[string]string{
		"username":u.Username,
		"password":u.Password,
	}
	if encoded, err := cookieHandler.Encode("session", value); err == nil{
		cookie := &http.Cookie{
			Name:"session",
			Value:encoded,
			Path:"/",
		}
		http.SetCookie(w,cookie)
		fmt.Println("session set")
	}
}

func getUserFromCookie(r *http.Request) (*db.User, error){

	pgDb := db.Connect()
	defer pgDb.Close()

	cookie, err := r.Cookie("session")
	if err == nil{

		cookieValue := make(map[string]string)
		err := cookieHandler.Decode("session",cookie.Value, &cookieValue)
		if err == nil{

			username := cookieValue["username"]
			password := cookieValue["password"]
			fmt.Printf("username : %s", username)
			fmt.Printf("password : %s", password)
			u := &db.User{
				Username: username,
				Password: password,
			}

			usr, err := u.FindUserByUsername(pgDb)
			if err != nil{
				return nil, err
			}
			return usr,nil
		}

	}
	return nil, err
}

func clearSession(w http.ResponseWriter, r *http.Request){
	cookie, err := r.Cookie("session")
	if err != nil {
		return
	}
	cookie.Expires = time.Now()
	http.SetCookie(w, cookie)
}

func encryptPW(pw string) string {
	password := []byte(pw)
	hashpw, _ := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
	return string(hashpw)
}

func createNewAccount(w http.ResponseWriter, r*http.Request){

	u := &db.User{}
	bod, errs := ioutil.ReadAll(r.Body)
	if errs != nil{
		http.Error(w,"Bad request",404)
		return
	}

	json.Unmarshal(bod, u)

	_, err := json.Marshal(u)
	if errs != nil {
		http.Error(w,"Bad request",404)
		return
	}

	u.Password = encryptPW(u.Password)

	pgDB := db.Connect()
	
	issues := u.CreateAccount(pgDB)
			if issues != nil {
		
				e := err.Error()
				usernameTaken := strings.Contains(e,"username")
				passwordTaken := strings.Contains(e,"password_key")
				if passwordTaken || usernameTaken {
					http.Error(w,"username or password taken", 403)
					return
				}
				fmt.Println(err)
				return
			}
			setSession(u,w)
			w.Write([]byte("Successfully signed up "+ u.Username))
			return
		}
	



func GetByUsername(un string, dbRef *pg.DB) (*db.User, error){
	
	usrRequested  := &db.User{
		Username:un,
	}
	usr, err := usrRequested.FindUserByUsername(dbRef)
	if err != nil {
		fmt.Printf("Username not found")
		return nil,err
	}
	return usr,nil
}

func isPasswordCorrect(pwFromDB, pwEntered string) bool{

	match := bcrypt.CompareHashAndPassword([]byte(pwFromDB), []byte(pwEntered))
	if match != nil{
		return false
	}
	return true
}

func login(w http.ResponseWriter, r *http.Request){

	u := &db.User{}
	bod,errors := ioutil.ReadAll(r.Body)
	if errors != nil{
		http.Error(w,"Bad request",404)
		return
	}

	json.Unmarshal(bod, &u)

	_,err := json.Marshal(u)
	if err != nil {
		http.Error(w,"Bad request",404)
		return
	}

	pgDB := db.Connect()

		usr,err := GetByUsername(u.Username, pgDB)
		if err != nil{
			http.Error(w,"wrong username or password",404)
			return
		}
		if isPasswordCorrect(usr.Password, u.Password){
			setSession(usr,w)
			w.Write([]byte("Succesfully logged in " + u.Username))
		}else{
			http.Error(w,"wrong username or password",404)
			return
		}
	}

func getCurrentUser(w http.ResponseWriter, r *http.Request){
	fmt.Println("invoked get current user")
	usr, _ := getUserFromCookie(r)
	if usr == nil {
		w.Write([]byte("false"))
		return 
	}
	obj,errs := json.Marshal(usr)
	if errs != nil {
		http.Error(w, "something went wrong", 500)
		return 
	}
	w.Write([]byte(obj))
	return 
}


func logOut(w http.ResponseWriter, r *http.Request){
	clearSession(w,r)
	w.Write([]byte("successfully logged out"))
	return
}

func addToCart(w http.ResponseWriter, r *http.Request){

	usr, _ := getUserFromCookie(r)
	if usr == nil {
		w.Write([]byte("failed to get user"))
		return 
	}

	p := &db.Product{}
	bod,errors := ioutil.ReadAll(r.Body)
	if errors != nil{
		http.Error(w,"Bad request",404)
		return
	}

	json.Unmarshal(bod, &p)
	_,err := json.Marshal(usr)
	if err != nil{
		w.Write([]byte("failed to marshal usr"))
		http.Error(w, "Internal Server Error", 500)
		return
	}

	p.User_ID = usr.UserID
	pgDB := db.Connect()

	errs := p.AddToCart(pgDB)
	if errs != nil {
		w.Write([]byte("failed to add to cart"))
		http.Error(w, "Internal Server Error", 500)
		return
	}

	w.Write([]byte("Successfully added "+p.Product_ID+" to cart"))
	return
}

func getCart(w http.ResponseWriter, r *http.Request){
	usr, _ := getUserFromCookie(r)
	if usr == nil {
		w.Write([]byte("failed to get user"))
		return 
	}
	pgDB := db.Connect()
	products, err := usr.GetAllProducts(pgDB)
	if err != nil {
		w.Write([]byte("error getting products"))
		http.Error(w,"Internal Server Error", 500)
		return
	}
	fmt.Printf("products returned: %v\n", products);
	obj, err := json.Marshal(products)
	if err != nil {
		w.Write([]byte("error marshaling products"))
		http.Error(w,"Internal Server Error", 500)
		return
	}
	w.Write(obj)
	fmt.Printf("products : %v\n", products)
	
}

func getCartTotal(w http.ResponseWriter , r *http.Request){
	usr, _ := getUserFromCookie(r)
	if usr == nil {
		w.Write([]byte("failed to get user"))
		return 
	}
	pgDB := db.Connect()
	total, err := usr.GetCartTotal(pgDB)
	if err != nil {
		w.Write([]byte("error getting total"))
		http.Error(w,"Internal Server Error", 500)
		return
	}

	w.Write([]byte(strconv.Itoa(total)))
	fmt.Printf("total from endpoint is : %d\n", total)
	return
}

func updateProductCount(w http.ResponseWriter, r *http.Request){
	usr, _ := getUserFromCookie(r)
	if usr == nil {
		w.Write([]byte("failed to get user"))
		return 
	}

	pgDB := db.Connect()
	p := &db.Product{}

	bod,errors := ioutil.ReadAll(r.Body)
	if errors != nil{
		http.Error(w,"Bad request",404)
		return
	}
	json.Unmarshal(bod, &p)
	fmt.Printf("product from request : %v\n", p)

	err := usr.UpdateProductCount(pgDB , p.Product_ID, p.Count ,p.Total)
	if err != nil {
		w.Write([]byte("failed to update product count"))
		return 
	}

	w.Write([]byte("Succesfully updated count of "+p.Product_ID))
	return
}


func main() {

	http.HandleFunc("/addToCart", addToCart)
	http.HandleFunc("/getCart",getCart)
	http.HandleFunc("/getCartTotal", getCartTotal)
	http.HandleFunc("/getUser", getCurrentUser)
	http.HandleFunc("/createNewAccount",createNewAccount)
	http.HandleFunc("/updateProductCount", updateProductCount)
	http.HandleFunc("/login", login)
	http.HandleFunc("/logout", logOut)
	http.ListenAndServe("localhost:8000",nil)
}