//server side
console.log("Hey - from app.js");

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var path = require('path');
//var router = express.Router();
var pg = require('pg');
//connect to SQL database "music_studio_tracker"
var connectionString = "postgres://localhost:5432/music_studio_tracker";
// connect to passport
//var passport = require('.')

//Route inclusion
//var login = require("./routes/login");
//var register = require("./routes/register");
//var router = require('./routes/router');

//body-parser middleware
app.use(bodyParser.json());

//server
app.set("port",(process.env.PORT||5000));
app.listen( app.get("port"), function(){
  console.log("Server is listening on port 5000, darling...");
});

app.get('/*',function(req,res){
  console.log("at base url, so that's something...");
  var file= req.params[0]||"/views/index.html";
  res.sendFile(path.join(__dirname,"/public", file));
});


//set static page
app.use(express.static('public'));

//app.use('/', router);

//set base url
app.get('/*',function(req,res){
  console.log("at base url, so that's something...");
  res.sendFile(path.resolve("./views/index.html"));
});
