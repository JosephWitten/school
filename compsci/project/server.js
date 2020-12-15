//Importing modules
const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const { count } = require("console");
const { copyFileSync } = require("fs");
let db;
//const url = "mongodb+srv://Admin:Qwerty123@programmingproject.ygawp.mongodb.net/users?retryWrites=true&w=majority"
const url = "mongodb://localhost:27017/mydb";
const APIkey = "51ETLGNY1DRMVLPR"
let currentValue = -1

//printDB();




//Setting cross origin headers
app.use(cors())

//Giving access to the public folder
app.use(express.static("public"))

//type handling for the client side fetch request 
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

//----------------------------------------------------------------------------------------------------------------

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

//----------------------------------------------------------------------------------------------------------------

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

//---------------------------------------------------------------------------------------------------------------------

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
                let newUser = { "username" : req.body.username, "password" : req.body.password, "theme" : "light", "time": "days", "paused": true, "stocks": 10, "money": 1000, "counter" : 1}
                users.collection("accounts").insertOne(newUser, function(err, res) {
                    if (err) throw err;
                    console.log("new user added")

                })
            }
            db.close()
        }) 
    })
})


//-----------------------------------------------------------------------------------------------------------------

app.post("/sell", (req, res) => {
    let amount = req.body.amount;
    console.log(amount)
    if(checkInt(amount)) {
        //continue with transaction
        console.log("int")
        amount = parseInt(amount, 10)

        //get session cookie value and extract username from it
        let seshValue = req.body.cookie
        seshValue = seshValue.replace("sesh=", "") 
        let buff = new Buffer(seshValue, "base64");
        let decoded = buff.toString("ascii")

        let index = decoded.lastIndexOf(":")
        let name = decoded.replace(decoded.substring(index), "")
        console.log(name)

        
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var users = db.db("users")
                users.collection("accounts").find({username: name}).toArray(function (err, result) {
                    if (err) throw err;
                    
                    if(result.length==1) {
                        console.log(result)
                        let currentStocksOwned = result[0].stocks
                        let currentMoney = result[0].money
                        
                        //check if user has correct amount of stocks
                        if (currentStocksOwned < amount) {
                            //return error
                            res.json({"error": "not enough stocks owned"})
                            console.log("you do not own enough stocks")
                        } else {
                            let newStocksOwned = currentStocksOwned - amount
                            let profit = currentValue*amount
                            let newMoney = currentMoney + profit
                            users.collection("accounts").updateOne({username:name}, {$set: {stocks: newStocksOwned, money : newMoney}})
                            //remember to visually update the users balance/stocks
                            let newVals = updateVals(name)
                            newVals.then(function (result) {
                                console.log(result)
                                res.json(result)
                            })
                        }

                    } else {
                        console.log("rare error where the user's name cannot be found in the table")
                    }
                })
        })


    } else {
        //give client error
        console.log("not an int")
        res.json({"error": "not an int"})
    }
})

function checkInt(value) {
    value = value.trim()
    value = parseInt(value, 10)
    return Number.isInteger(Math.abs(value))
}

//------------------------------------------------------------------------------------------------------------------------

app.post("/nextDayPlease", (req, res) => {

    //get session cookie value and extract username from it
    let seshValue = req.body.sesh
    seshValue = seshValue.replace("sesh=", "") 
    let buff = new Buffer(seshValue, "base64");
    let decoded = buff.toString("ascii")

    let index = decoded.lastIndexOf(":")
    let name = decoded.replace(decoded.substring(index), "")

    res.setHeader('Content-Type', 'application/json');


    let counter = -1
    
    let labels = []
    let dataSet = []


    MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        var users = db.db("users")

        users.collection("accounts").find({username: name}).toArray(function (err, result) {
                if (err) throw err;

                if (result.length==1) {
                    counter = result[0].counter
                } else {
                    console.log("rare error where the user's name cannot be found in the table")
                }
        })

        await sleep(100);
        
        for (let i = counter; i < counter+7; i++) {
            users.collection("stockData").find({counter: i}).toArray(function (err, result) {
                labels.push(result[0].date)
                dataSet.push(result[0].value)
            })
            await sleep(100)
        }
        
        await sleep(100);

        users.collection("accounts").findOneAndUpdate({username: name}, { $set: {"counter" : counter + 1}}, {upsert : true})

        await sleep(100);

        currentValue = dataSet[6]

        let responseObject = {"labels" : labels, "dataSet" : dataSet } 

        res.json(responseObject)
    })
})

//-------------------------------------------------------------------------------------------------------------------------

async function updateVals(name) {
    let stocks = -1
    let money = -1

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let users = db.db("users")
        users.collection("accounts").find({username: name}).toArray(function (err, result) {
            if (err) throw err;
             if(result.length==1) {
                console.log(result)

                stocks = result[0].stocks
                money = result[0].money


             }  else {
                console.log("rare error where the user's name cannot be found in the table")
            }
        })
    })
    await sleep(100)

    let temp = {"stocks" : stocks, "money" : money}
    
    return temp
}


app.post("/updateVals", async (req, res) => {
    
    let stocks = -1
    let money = -1

    //get session cookie value and extract username from it
    let seshValue = req.body.sesh
    console.log(req.body.sesh)
    seshValue = seshValue.replace("sesh=", "") 
    let buff = new Buffer(seshValue, "base64");
    let decoded = buff.toString("ascii")

    let index = decoded.lastIndexOf(":")
    let name = decoded.replace(decoded.substring(index), "")
    console.log(name)

    let temp = updateVals(name)
    await sleep(100)
    
    temp.then(function(result) {
        temp = result
    })
    await sleep(100)


    res.json(temp)


})

//-------------------------------------------------------------------------------------------------------------------------

app.post("/buy", (req, res) => {
    let amount = req.body.amount;
    console.log(amount)
    if(checkInt(amount)) {
        //continue with transaction
        console.log("int")
        amount = parseInt(amount, 10)

        //get session cookie value and extract username from it
        let seshValue = req.body.cookie
        seshValue = seshValue.replace("sesh=", "") 
        let buff = new Buffer(seshValue, "base64");
        let decoded = buff.toString("ascii")

        let index = decoded.lastIndexOf(":")
        let name = decoded.replace(decoded.substring(index), "")
        console.log(name)

        
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var users = db.db("users")
                users.collection("accounts").find({username: name}).toArray(function (err, result) {
                    if (err) throw err;
                    
                    if(result.length==1) {
                        console.log(result)
                        let currentMoney = result[0].money
                        let currentStocksOwned = result[0].stocks
                        
                        let price = amount*currentValue

                        //check if user has correct amount of money
                        if (currentMoney < price) {
                            //return error
                            res.json({"error": "You do not have enough money"})
                            console.log("you do not own enough money")
                        } else {
                            let newStocksOwned = currentStocksOwned + amount
                            let newMoney = currentMoney - price
                            users.collection("accounts").updateOne({username:name}, {$set: {stocks: newStocksOwned, money : newMoney}})

                            let newVals = updateVals(name)
                            newVals.then(function (result) {
                                console.log(result)
                                res.json(result)
                            })
                        }

                    } else {
                        console.log("rare error where the user's name cannot be found in the table")
                    }
                })
        })


    } else {
        //give client error
        console.log("not an int")
        res.status(702).json()
    }
})

//-------------------------------------------------------------------------------------------------------------

function GetAPIdata() {
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

    let dataArray =[]
    for (let i in bigData) {
      dataArray.push({[i] : bigData[i]["4. close"]})
    }

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let users = db.db("users");
      users.collection("stockData").insertMany(dataArray, function(err, res) {
          if (err) throw err;
          console.log("insrted")
          db.close()
      })
  });
  
  
    }).on("error", (err) => {
  console.log(err)
    })
})

}