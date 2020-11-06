
let signUpButton = document.getElementById("signUpButton");
let signUpPassword2 = document.getElementById("password2");

signUpPassword2.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        signUp()
    }
})

signUpButton.addEventListener("click", function (e) {
    signUp()
})

function signUp() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    console.log(password2)
    if(samePassword(password, password2)) {
        let data = {
            "username" : username,
            "password" : password,
            "password2" : password2
        }
        let headers = {
            "Content-Type" : "application/json"
        }
        data = JSON.stringify(data)
        console.log(data)
        fetch("/signmeupplease", {method: "POST", headers: headers, body: data})
        .then(function(response) {
            console.log(response)
            if (response.status == 500) {
                document.getElementById("error").style.visibility = "visible"
            }
        })
    }
}

function samePassword(password, password2) {
    if (password == password2) {
        return true
    } else {
        return false
    }
}
