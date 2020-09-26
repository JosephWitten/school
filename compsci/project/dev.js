var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://Admin:Qwerty123@programmingproject.ygawp.mongodb.net/users?retryWrites=true&w=majority"

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let users = db.db("users");
    let obj = { id : 0, username : "SuperCoolDevAccount", password : "verysecurepassword", theme : "light", time : "days", paused : true, stocks: 0, money: 1000};
    users.collection("accounts").insertOne(obj, function(err, res) {
        if (err) throw err;
        console.log("insrted")
        db.close()
    })
});