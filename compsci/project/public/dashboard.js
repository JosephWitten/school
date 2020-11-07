let dashboardTime = document.getElementById("time");
let dashboardTheme = document.getElementById("theme");
let dashboardPlay = document.getElementById("play");

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