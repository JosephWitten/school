const fs = require("fs");
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/login.html"))
})

app.listen(8080, () => {
    console.log("Listening on localhost:8080")
})