var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
/*
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
const APIkey = "51ETLGNY1DRMVLPR"
const { constants } = require('buffer');
const https = require("https");

https.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=" + APIkey, (response) => {
  let data = ""
  let bigData = ""
  
  response.on("data", (chunk) => {
    data += chunk
  })

  response.on("end", () => {
    bigData = JSON.parse(data)["Time Series (Daily)"]
    for (let day in bigData) {
      delete bigData[day]["1. open"]
      delete bigData[day]["2. high"]
      delete bigData[day]["3. low"]
      delete bigData[day]["5. volume"]
    }

    
    //bigData = Object.values(bigData)

    let dataArray =[]
    for (let i in bigData) {
      console.log(i)
      dataArray.push({i : bigData[i]["4. close"]})
    }

    console.log(dataArray)

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let users = db.db("users");
      users.collection("stockData").insertMany(dataArray, function(err, res) {
          if (err) throw err;
          console.log("insrted")
          db.close()
      })
  });
  })
  
}).on("error", (err) => {
  console.log(err)
})


