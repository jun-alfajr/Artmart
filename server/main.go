package main

import (
	"net/http" 
	"strings"
	"io/ioutil"
	"encoding/json"
	"time"
	"strconv"
	"log"

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
		return
	}
	return
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
	u.Password = encryptPW(u.Password)
	pgDB := db.Connect()
	
	err := u.CreateAccount(pgDB)
			if err != nil {
				e := err.Error()
				usernameTaken := strings.Contains(e,"username")
				passwordTaken := strings.Contains(e,"password_key")
				if passwordTaken || usernameTaken {
					http.Error(w,"username or password taken", 403)
					return
				}
				return
			}
			setSession(u,w)
			log.Printf("Successfully signed up")
			return
		}
	



func GetByUsername(un string, dbRef *pg.DB) (*db.User, error){
	
	usrRequested  := &db.User{
		Username:un,
	}
	usr, err := usrRequested.FindUserByUsername(dbRef)
	if err != nil {
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
	pgDB := db.Connect()

		usr,err := GetByUsername(u.Username, pgDB)
		if err != nil{
			http.Error(w,"wrong username or password",403)
			return
		}
		if isPasswordCorrect(usr.Password, u.Password){
			setSession(usr,w)
			w.Write([]byte("Succesfully logged in "))
			return
		}else{
			http.Error(w,"wrong username or password",404)
			return
		}
	}

func getCurrentUser(w http.ResponseWriter, r *http.Request){
	usr, _ := getUserFromCookie(r)
	if usr == nil {
		w.Write([]byte("false"))
		return 
	}
	w.Write([]byte(usr.Username))
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
		return 
	}

	p := &db.Product{}
	bod,errors := ioutil.ReadAll(r.Body)
	if errors != nil{
		http.Error(w,"Bad request",404)
		return
	}

	json.Unmarshal(bod, &p)
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
		log.Printf("error getting user from cookie")
		w.Write([]byte("failed to get user from cookie"))
		return 
	}
	pgDB := db.Connect()
	products, err := usr.GetAllProducts(pgDB)
	if err != nil {
		log.Printf("error from getAllProducts")
		w.Write([]byte("error getting products"))
		http.Error(w,"Internal Server Error", 500)
		return
	}
	obj, err := json.Marshal(products)
	if err != nil {
		log.Printf("error marshaling products")
		w.Write([]byte("error marshaling products"))
		http.Error(w,"Internal Server Error", 500)
		return
	}
	w.Write(obj)
	return	
}

func getCartTotal(w http.ResponseWriter , r *http.Request){
	usr, _ := getUserFromCookie(r)
	if usr == nil {
		w.Write([]byte("failed to get user from cookie"))
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
	return
}

func updateProductCount(w http.ResponseWriter, r *http.Request){
	usr, _ := getUserFromCookie(r)
	if usr == nil {
		w.Write([]byte("failed to get user from cookie"))
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
	err := usr.UpdateProductCount(pgDB , p.Product_ID, p.Count ,p.Total)
	if err != nil {
		w.Write([]byte("failed to update product count"))
		return 
	}

	w.Write([]byte("Succesfully updated count of "+p.Product_ID))
	return
}

func removeProduct(w http.ResponseWriter, r *http.Request){
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
	err := usr.RemoveProduct(pgDB , p.Product_ID)
	if err != nil {
		w.Write([]byte("failed to  remove product"))
		http.Error(w,"Internal Server Error", 500)
		return 
	}
	w.Write([]byte("Succesfully removed "+p.Product_ID))
	return
}

func clearCart(w http.ResponseWriter, r *http.Request){
	usr, _ := getUserFromCookie(r)
	if usr == nil {
		w.Write([]byte("failed to get user from cookie"))
		return 
	}
	pgDB := db.Connect()
	err := usr.ClearCart(pgDB)
	if err != nil{
		w.Write([]byte("failed to clear cart"))
		http.Error(w,"Internal Server Error", 500)
		return 
	}
	w.Write([]byte("Succesfully cleared cart"))
	return
}

func catchAll(w http.ResponseWriter , r *http.Request){
	log.Println("catchAll invoked")
	http.ServeFile(w,r,"frontend/build/index.html")
}

func main() {
	
	http.HandleFunc("/", catchAll)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("frontend/build/static"))))
	http.Handle("/img/", http.StripPrefix("/img/", http.FileServer(http.Dir("frontend/build/img"))))
	http.HandleFunc("/login", login)
	http.HandleFunc("/logout", logOut)
	http.HandleFunc("/createNewAccount",createNewAccount)
	http.HandleFunc("/getUser", getCurrentUser)
	http.HandleFunc("/getCart",getCart)
	http.HandleFunc("/addToCart", addToCart)
	http.HandleFunc("/getCartTotal", getCartTotal)
	http.HandleFunc("/updateProductCount", updateProductCount)
	http.HandleFunc("/removeProduct", removeProduct)
	http.HandleFunc("/clearCart", clearCart)
	http.ListenAndServe(":8000",nil)
}