const fs = require("fs");
const express = require("express");
const http = require("http");


var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
        res.write("One cool test!")
        res.end();
});

server.listen(8080, function() {
    console.log("Listening on 8080");
});
