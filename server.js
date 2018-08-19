// var express = require('express'),
//   app = express(),
//   port = process.env.PORT || 3000,
//   mongoose = require('mongoose'),
//   Task = require('./api/models/memoryBoxModel'), //created model loading here
//   bodyParser = require('body-parser');
//
// // mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://ronoc4444:Homerscb4!@ds125402.mlab.com:25402/memorybox', { useNewUrlParser: true });
//
// app.use('/uploads', express.static('uploads'))
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//
//
// var routes = require('./api/routes/memoryBoxRoutes'); //importing route
// routes(app); //register the route
//
//
// app.listen(port);
//
// app.use(function(req, res) {
//   // The snippet bellow helps to redirect and respond whenever a wrong route is entered on the site.
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });
//
// console.log('todo list RESTful API server started on: ' + port);
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

var routes = require('./api/routes/memoryBoxRoutes.js'); //importing route
routes(app); //register the route

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
