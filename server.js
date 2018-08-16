var express = require('express'),
  app = express(),
  port = process.env.PORT || 9000,
  mongoose = require('mongoose'),
  Task = require('./api/models/memoryBoxModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://18.217.114.25/memoryBox');

app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/memoryBoxRoutes'); //importing route
routes(app); //register the route


app.listen(port);

// app.use(function(req, res) {
//   // The snippet bellow helps to redirect and respond whenever a wrong route is entered on the site.
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });

console.log('todo list RESTful API server started on: ' + port);
