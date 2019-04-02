# Artmart

Live demo [here](http://ec2-18-221-215-86.us-east-2.compute.amazonaws.com/)

Video demo [here](https://youtu.be/cjd5pjdQJMs)

E-commerce site to buy hand-made crafts

By Faris Huskovic and Benjamin Lin


# Tech Stack

Client-side/Front-end - React.js

Server-Side/Back-end/API - Golang

Database - Postgres

# Dependencies

[Golang](https://golang.org/dl/) and [Node](https://nodejs.org/en/)

    npm install
    go get github.com/go-pg/pg
	go get github.com/joho/godotenv
    go get github.com/gorilla/securecookie
	go get golang.org/x/crypto/bcrypt

# Running

First start the server 

    go run server/main.go

Then run the app

    npm start

