let dashboardTime = document.getElementById("time");
let dashboardTheme = document.getElementById("theme");
let dashboardPlay = document.getElementById("play");
let sellBtn = document.getElementById("sellbtn");
let sellField = document.getElementById("sell")


if (document.cookie.indexOf('sesh=') == -1) {
    window.location = "/login.html"
}


dashboardTime.addEventListener("click", function (e) {
    changeTime();
})
dashboardTime.addEventListener("keypress", function (e) {
    if (e.key == "Enter") { changeTime(); }
})

function changeTime() {
    let body = JSON.stringify({"sesh": document.cookie})
    fetch("/changethetimeplease", {method: "POST", headers: {"Content-Type" : "application/json"}, body: body})
    .then(function(response) {
         
    })
}

sellBtn.addEventListener("click", function(e) {
    sell()

})
sellField.addEventListener("keypress", function (e) {
    if (e.key == "Enter") { sell() }
})

function sell() {
    let value = document.getElementById("sell").value;
    let body = JSON.stringify({amount: value, cookie: document.cookie})
    fetch("/sell", {method: "POST", headers : {"Content-Type" : "application/json"}, body: body})
    .then(function(response) {

    })

}