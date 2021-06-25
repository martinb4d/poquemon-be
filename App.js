var express = require("express")
var app = express()
var Pokemon
var db = require("./database.js")
var router = require('./routes/PokemonController');   
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8080
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.use('/', router);  