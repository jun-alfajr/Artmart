package main

import (
	"net/http" 
	"strings"
	"fmt"
	"io/ioutil"
	"encoding/json"
	"time"

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
	usr,_ := getUserFromCookie(r)
	if usr == nil {
		w.Write([]byte("false"))
		return
	}
	_, err := json.Marshal(usr)
	if err != nil {
		http.Error(w, "something went wrong", 500)
	}
	w.Write([]byte(usr.Username))
	return
}


func logOut(w http.ResponseWriter, r *http.Request){
	clearSession(w,r)
	w.Write([]byte("successfully logged out"))
	return
}


func main() {

	http.HandleFunc("/getUser", getCurrentUser)
	http.HandleFunc("/createNewAccount",createNewAccount)
	http.HandleFunc("/login", login)
	http.HandleFunc("/logout", logOut)
	http.ListenAndServe("localhost:8000",nil)
}