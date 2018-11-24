// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/recipes");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Recipe = mongoose.model('Recipe', {
    name: String,
    instructions: String
    // ingredients: JSON
});



// Get all Recipe items
app.get('/api/recipes', function (req, res) {

    console.log("Listing recipes items...");

    //use mongoose to get all recipes in the database
    Recipe.find(function (err, recipes) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(recipes); // return all recipes in JSON format
    });
});


// Get a single Recipe Item
app.get('/api/recipes/:id', function (req, res) {
    console.log("Getting the specified recipe.");
    Recipe.find({
        _id: req.params.id
    }, function (err, recipes) {
        if (err) {
            console.error("Error finding Recipe ", err);
            res.send(err);
        }

        res.json(recipes);
    });
});



// Create a Recipe Item
app.post('/api/recipes', function (req, res) {

    console.log("Creating Recipe item...");

    Recipe.create({
        name: req.body.name,
        instructions: req.body.instructions,
        done: false
    }, function (err, Recipe) {
        if (err) {
            res.send(err);
        }

        // create and return all the recipes
        Recipe.find(function (err, recipes) {
            if (err)
                res.send(err);
            res.json(recipes);
        });
    });

});

// Update a Recipe Item
app.put('/api/recipes/:id', function (req, res) {
    const Recipe = {
        name: req.body.name,
        instructions: req.body.instructions
    };
    console.log("Updating item - ", req.params.id);
    Recipe.update({_id: req.params.id}, Recipe, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a Recipe Item
app.delete('/api/recipes/:id', function (req, res) {
    Recipe.remove({
        _id: req.params.id
    }, function (err, Recipe) {
        if (err) {
            console.error("Error deleting Recipe ", err);
        }
        else {
            Recipe.find(function (err, recipes) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(recipes);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Recipe server listening on port  - ", (process.env.PORT || 8080));