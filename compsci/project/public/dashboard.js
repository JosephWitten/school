let dashboardTime = document.getElementById("time");
let dashboardTheme = document.getElementById("theme");
let dashboardPlay = document.getElementById("play");
let sellBtn = document.getElementById("sellbtn");
let sellField = document.getElementById("sell")
let buyField = document.getElementById("buy")
let buyBtn = document.getElementById("buybtn")
let error = document.getElementById("error")

updateGraph()

//----------------------------------------------------------

if (document.cookie.indexOf('sesh=') == -1) {
    window.location = "/login.html"
}

//----------------------------------------------------------

dashboardPlay.addEventListener("click", function (e) {
    updateGraph();
});

function updateGraph() {
    let body = JSON.stringify({"sesh": document.cookie})
    fetch("/nextDayPlease", {method: "POST", headers: {"Content-Type" : "application/json"}, body: body})
    .then(res => res.json())
    .then(function(response) {
        console.log(response)
        console.log(response.body);

        let labelArray = response.labels
        let dataSetArray = response.dataSet

        let ctx = document.getElementById('myChart').getContext('2d');
        let myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labelArray,
                datasets: [{
                    label: 'Stock Value',
                    backgroundColor: 'rgb(143, 181, 242)',
                    borderColor: 'rgb(32, 32, 32)',
                    data: dataSetArray
                }]
            },
            options: {
                animation: {
                    duration: 0
                }
                /*scales : {
                    yAxes : [ {
                        ticks : {
                            suggestedMin : ,
                            suggestedMax : ,
                        }
                    }]
                }*/
            }
        });
    }).catch(err => console.log(err))
}




//----------------------------------------------------------

dashboardTime.addEventListener("click", function (e) {
    changeTime();
})
dashboardTime.addEventListener("keypress", function (e) {
    if (e.key == "Enter") { changeTime(); }
})


//----------------------------------------------------------

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
        console.log(response.status)
        if (response.status == 601) {
            error.innerHTML = "You don't have enough stocks"
        } else if (response.status == 701) {
            error.innerHTML = "not valid input"
        }
    })

}

//-------------------------------------------------------------

buyBtn.addEventListener("click", function(e) {
    buy()
})
buyField.addEventListener("keypress", function(e) {
    if (e.key == "Enter") { buy() }
})

function buy() {
    let value = buyField.value;
    let body = JSON.stringify({amount: value, cookie: document.cookie})
    fetch("/buy", {method: "POST", headers: {"Content-Type" : "application/json"}, body:body})
    .then(function(response) {
        if (response.status == 602) {
            error.innerHTML = "not enough money"
        } else if (response.status == 702) {
            error.innerHTML = "not valid input"
        }
    })
}

//--------------------------------------------------------------