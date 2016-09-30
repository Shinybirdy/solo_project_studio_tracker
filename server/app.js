//server side
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var connectionString = require("./modules/connection");
var path = require('path');
var pg = require('pg');
  var client = new pg.Client();
var router = express.Router();
var users = require('./routes/user');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var index = require('./routes/index');
var masterSchedule = require("./routes/master_schedule");
var register = require('./routes/register');
var studentRoute = require("./routes/studentRoute");
//var topSecret = require('./routes/topsecret');
var user = require("./routes/user");

app.use('/', index);
app.use('/master_schedule', masterSchedule);
app.use('/register', register);
app.use('/students', studentRoute);
app.use('/user', user);

//Route inclusion .js files
//var auth = require("./routes/auth");

/** Routes **/
//app.use('/topsecret', topSecret);
/**Server Start **/
app.set("port",(process.env.PORT||5000));
app.listen( app.get("port"), function(){
  console.log("Server is listening on port 5000, darling...");
});

/** Base url & Index File  Hit DB**/
app.get('/*',function(req,res){
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

});

module.exports=app;
