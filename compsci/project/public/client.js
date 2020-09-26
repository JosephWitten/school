let loginButton = document.getElementById("LoginButton");

loginButton.addEventListener("click", function(e) {
    console.log("test")
    let username = document.getElementById("LoginUsername").innerHTML
    let password = document.getElementById("LoginPassword").innerHTML
    let data  = {
        "username" : username,
        "password" : password
    }
    let headers = {
        "Content-Type" : "application/json"
    }
    fetch("/logmeinplease", {method: "POST", headers : headers,  body: data})
    .then(function(response) {
        console.log(response)
    })
})