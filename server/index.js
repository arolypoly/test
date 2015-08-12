var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// Create the application.
var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(function (req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  next();
})

app.get('/hello', function(req, res, next) {
  res.json({message:'Hello world'});
});

app.get('/', function(req, res, next) {
  res.send('<img src="http://vevox.io/asset/copter.jpg">');
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost/meanapp');
mongoose.connection.once('open', function() {

  console.log('Listening on port 3000...');
  app.listen(3000);
});
