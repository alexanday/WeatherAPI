const express = require('express');
const app = new express();
const https = require("https");

app.use(express.urlencoded({extender: true}));


app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
    
})

app.post("/", function(req, res){

    const query = req.body.cityName;
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=47a445a214a065d2151486b503302b67&units=" + unit;

    https.get(url, function(response){
    console.log(response.statusCode);
    
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        console.log(temperature);
        console.log(description);

        res.write("<h1>Current temperature in " + query + ": " + temperature + " degrees fahrenheit</h1>");
        res.write("<h1>The weather is currently: " + description + "</h1>");
        res.write("<img src=" + iconUrl + ">");
        res.send();
    
    })
    });

    console.log("Post success");
})

app.listen(3000, function(){
    console.log("Listening on port 3000");
})