const express = require('express');
const bodyParser = require('body-parser');
const Task = require('./api/models/memoryBoxModel')//created model loading here

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = 'mongodb://ronoc4444:Homerscb4!@ds125402.mlab.com:25402/memorybox'
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./api/routes/memoryBoxRoutes.js')(app); //register the route

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
