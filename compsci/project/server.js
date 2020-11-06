//Importing modules
const fs = require("fs");
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors")
const bodyParser = require('body-parser')
let db;
//const url = "mongodb+srv://Admin:Qwerty123@programmingproject.ygawp.mongodb.net/users?retryWrites=true&w=majority"
const url = "mongodb://localhost:27017/mydb";

printDB();

//Setting cross origin headers
app.use(cors())

//Giving access to the public folder
app.use(express.static("public"))

//type handling for the client side fetch request
app.use( bodyParser.json() );     
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.use(express.json());


//sets a listener on port 8080 for development
//change to 80/443 for production
app.listen(8080, () => {
    console.log("Listening on localhost:8080")
})

//handle get requests
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/login.html"))
})

function printDB() {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        
        var users = db.db("users")
        users.collection("accounts").find().toArray(function(err, result) {
            if (err) throw err;
            console.log(result)
            db.close();
        });
      });
}


//post end point
app.post("/logmeinplease", (req, res) => {
    //search for user in db
    console.log(req.body)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err
        var users = db.db("users")
        let query = { username: req.body.username, password: req.body.password}
        users.collection("accounts").find(query).toArray(function(err, result) {
            if (err) throw err;
            
            if (result.length == 1) {
                console.log("Entry found")
                let cookie = createCookie(result[0].username, result[0].password)
                res.cookie("sesh", cookie)
                res.sendStatus(301)
                
            } else {
                console.log("No users");
                res.sendStatus(400)
            }
            db.close()
        })
    })
})

function createCookie(username, password) {
    return Buffer.from(username + ":" + password).toString('base64')
}

app.post("/signmeupplease", (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err
        var users = db.db("users")
        let query = { username: req.body.username}
        users.collection("accounts").find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length==1) {
                console.log("Username taken")
                res.sendStatus(500)
            } else {
                let newUser = { "username" : req.body.username, "password" : req.body.password, "theme" : "light", "time": "days", "paused": true, "stocks": 0, "money": 1000}
                users.collection("accounts").insertOne(newUser, function(err, res) {
                    if (err) throw err;
                    console.log("new user added")

                })
            }
            db.close()
        }) 
    })
})



app.post("/changethetimeplease", (req, res) => {
    
})