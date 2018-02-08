// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var session = require('express-session');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var fs = require('fs');
var mongodb = require('mongodb');
var monk = require('monk');
var exec = require('child_process').exec;

var jdb = monk('localhost:27017/jukes');


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// listen (start app with node server.js) ======================================
app.listen(80);
console.log("App listening on port 80");

eval(fs.readFileSync('juke.js')+'');


// application -------------------------------------------------------------
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/juke.htm');
});

 app.get(/^(.+)$/, function(req, res){ 
    res.sendfile( __dirname + '/public/' + req.params[0]); 
 });

