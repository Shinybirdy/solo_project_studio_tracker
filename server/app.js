console.log("Hey - from app.js");
//server side
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var path = require('path');
      //postgres server connection
var pg = require('pg');
var connectionString = require("./modules/connection");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(session({
  secret: "secret",
  //key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure : false },

}));
//Initialize Passport
app.use(passport.initialize()); // kickstart passport
app.use(passport.session());

passport.use('local', new localStrategy({ passReqToCallback : true, usernameField: 'username' },
  function(req, username, password, done) {
    console.log('called local');
      pg.connect(connectionString, function(err, client){
        console.log('called local-pg');

        var user = {};

          var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

          query.on('row', function (row) {
            console.log('User obj', row);
            console.log('Password', password);
            user = row;
            if(password == user.password){
              console.log('match!');
              done(null, user);
            } else {
              done(null, false, { message: 'Incorrect username and password.' });
            }

          });//end query.on

          // After all data is returned, close connection and return results
          query.on('end', function () {
              client.end();
          });

          // Handle Errors
          if (err) {
              console.log(err);
          }
      });//end pg connect

  }));//end passport.use function

passport.serializeUser (function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  console.log('called deserializeUser - pg');
  var quert= client.query("SELECT * FROM users WHERE id = $1", [id]);

            query.on('row', function (row) {
              console.log('User row', row);
              user = row;
              done(null, user);
            });

            // After all data is returned, close connection and return results
            query.on('end', function () {
                client.end();
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }
        });//end deserialize user


//Route inclusion .js files
//var auth = require("./routes/auth");
var index = require('./routes/index');
var masterSchedule = require("./routes/master_schedule");
var register = require('./routes/register');

var studentRoute = require("./routes/studentRoute");
var user = require("./routes/user");
/** Routes **/
//app.use('/auth', auth);
app.use('/', index);
app.use('/master_schedule', masterSchedule);
app.use('/register', register);

app.use('/students', studentRoute);


/**Server Start **/
app.set("port",(process.env.PORT||5000));

app.listen( app.get("port"), function(){
  console.log("Server is listening on port 5000, darling...");
});


/** Base url & Index File  Hit DB**/
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

});
module.exports=app;
