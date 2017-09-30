var express = require('express'),
  app = express(),
  session = require('express-session'),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  product = require('./api/Models/product'),
   cart = require('./api/Models/cart'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/Routes/rote'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);