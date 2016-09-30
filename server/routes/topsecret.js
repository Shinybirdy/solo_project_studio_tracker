var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
console.log ("TOPSECRET!!!");
// var pg = require('pg');
// var connectionString = require("./modules/connection");
// var client = new pg.Client();
var users = require('./routes/user');
var router = express.Router();

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
passport.use( new Strategy({ passReqToCallback : true, usernameField: 'username' },
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

          }));  //end passport.use function



          passport.serializeUser (function(user, done) {
            done(null, user.id);
          });
          passport.deserializeUser(function(id, done){
            console.log('called deserializeUser - pg');
             query= client.query("SELECT * FROM users WHERE id = $1", [id]);

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
module.exports = router;
