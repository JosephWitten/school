let loginButton = document.getElementById("LoginButton");

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
        console.log(response.status)
        if (response.status == 400) {            
            document.getElementById("error").style.visibility = "visible"
        } else {
            document.getElementById("error").style.visibility = "hidden"
            document.cookie = "username=" + document.getElementById("LoginUsername").value;
        }
    }).catch(err => console.log("ERROR" + err))
}