console.log("Hey - from app.js");
//server side
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//postgres server connection
var pg = require('pg');
var connectionString = require("./modules/connection");

//body-parser middleware
app.use(bodyParser.json());

//server
app.set("port",(process.env.PORT||5000));

app.listen( app.get("port"), function(){
  console.log("Mama is listening on port 5000, darling...");
});

//set static page
app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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


//code from Heroku node.js set up////
//pg.defaults.ssl = true;

//base url & index file
app.get('/*',function(req,res){
  console.log("at base url, so that's something...");

  app.get('/:db', function (req, res) {
    var db = req.params.db;

    pg.connect(connectionString, function(err, client, done) {

      if (err){
        res.sendStatus(500);
      }

      client.query('SELECT * FROM students', function(err, result) {
        done();
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { response.render('pages/db', {results: result.rows} ); }
      });
    });
  });

  var file= req.params[0]||"/views/index.html";
  res.sendFile(path.join(__dirname,"/public", file));
  //res.sendFile(path.resolve("views/index.html"));
});



// app.use('/', router);
module.exports=app;
