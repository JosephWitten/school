let loginButton = document.getElementById("LoginButton");
let loginPassword = document.getElementById("LoginPassword");

loginPassword.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        check()
    }
})

loginButton.addEventListener("click", function(e) {
    check()
})

function check() {
    let username = document.getElementById("LoginUsername").value;
    let password = document.getElementById("LoginPassword").value;
    let data  = {
        "username" : username,
        "password" : password
    }
    let headers = {
        "Content-Type" : "application/json"
    }
    data = JSON.stringify(data)
    fetch("/logmeinplease", {method: "POST", headers : headers,  body: data})
    .then(function(response) {
        console.log(response)
        if (response.status == 400) {            
            document.getElementById("error").style.visibility = "visible"
        } else {
            document.getElementById("error").style.visibility = "hidden"
            window.location = "/dashboard.html"
        }
    }).catch(err => console.log("ERROR" + err))
}

