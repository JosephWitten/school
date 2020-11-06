var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

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

/*
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  console.log("Database created/connected");
  db.close();
});*/