const fs = require("fs");
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors")
let db;
const url = "mongodb+srv://Admin:Qwerty123@programmingproject.ygawp.mongodb.net/users?retryWrites=true&w=majority"

app.use(cors())

app.use(express.static("public"))


app.listen(8080, () => {
    console.log("Listening on localhost:8080")
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/login.html"))
})



app.post("/logmeinplease", (req, res) => {
    console.log(req)
    console.log(res)
    //search for user in db
    MongoClient.connect(url, function(err, db) {
        if (err) throw err
        var users = db.db("users")
        let query = { username: "", password: ""}
        users.collection("accounts").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result)
            db.close()
        })
    })

})