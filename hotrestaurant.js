// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var tables = [
    {
        customerName: "yoda",
        phoneNumber: "Yoda",
        customerEmail: "Jedi Master",
        customerID: 900
    }
];

var waitList = [
    {
        customerName: "meow",
        phoneNumber: "meow",
        customerEmail: "meow",
        customerID: 800
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});



app.get("/api/tables", function (req, res) {
    res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
    res.json(waitList);
});

// Displays a single character, or returns false
/*app.get("view/:table", function (req, res) {
    var chosen = req.params.character;

    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
        if (chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }

    return res.json(false);
});*/

// Create New Characters - takes in JSON input
app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware

    var newTable = {
        customerName: req.body.customerName,
        phoneNumber: req.body.phoneNumber,
        customerEmail: req.body.customerEmail,
        customerID: req.body.customerID
    }

    console.log(newTable);

    if (tables.length < 5) {
        tables.push(newTable);
    }
    else waitList.push(newTable);

    res.sendFile(path.join(__dirname, "tables.html"));

});


app.post("/api/clear", function (req, res) {

    tables = [];
    waitList = [];

    res.json("DONE?");

});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
