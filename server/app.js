console.log("Hey - from app.js");
//server side
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//postgres server connection
var pg = require('pg');
var connectionString = "postgres://localhost:5432/music_studio_tracker";
//body-parser middleware
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));

//server
app.set("port",(process.env.PORT||8080));


//set static page
app.use(express.static('public'));

//Route inclusion .js files
var login = require("./routes/login");
var studentRoute = require("./routes/studentRoute");
var masterSchedule = require("./routes/master_schedule");

//var router = require('./routes/router');

//Passport syntax to go here:HA HA HA HA HA HA HA.....

//routes
app.use('/login', login);
app.use('/students', studentRoute);
app.use('/master_schedule', masterSchedule);


//base url & index file
app.get('/*',function(req,res){
  console.log("at base url, so that's something...");

  var file= req.params[0]||"/views/index.html";
  res.sendFile(path.join(__dirname,"/public", file));
  //res.sendFile(path.resolve("views/index.html"));
});

app.listen( app.get("port"), function(){
  console.log("Server is listening on port 8080, darling...");
});

// app.use('/', router);
module.exports=app;
