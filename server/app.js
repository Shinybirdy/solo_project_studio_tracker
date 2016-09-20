console.log("Hey - from app.js");
//server side
//Require Node Modules
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var path = require('path');

//postgres server connection
var pg = require('pg');
var connectionString = require("./modules/connection");
/** Require Custom App Modules */
var passport = require('./auth/passport');
var configs = require('./config/auth');
//var index = require('./routes/index');
var auth = require('./routes/auth');
var isLoggedIn = require('./utils/auth');
var private = require('./routes/private/index');
var database = require('./utils/database');

//Express App Config
var app = express();
app.use(express.static('public'));
//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
//Database Connection Handling
//database();
//Session Creation and Storage
//**Creates session that will be stored in memory.
// @todo Before deploying to production,
// configure session store to save to DB instead of memory (default).
// @see {@link https://www.npmjs.com/package/express-session}
//

app.use(session({
  secret: configs.sessionVars.secret,
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure : false },

}));
//Passport
app.use(passport.initialize()); // kickstart passport
/**
* Alters request object to include user object.
* @see (@link auth/passport)
*/
app.use(passport.session());

//Route inclusion .js files
var login = require("./routes/login");
var studentRoute = require("./routes/studentRoute");
var masterSchedule = require("./routes/master_schedule");

/** Routes **/

app.use('/auth', auth);
app.use('/private', isLoggedIn, private);
app.use('/', index);

app.use('/login', login);
app.use('/students', studentRoute);
app.use('/master_schedule', masterSchedule);

/**Server Start **/
app.set("port",(process.env.PORT||5000));

app.listen( app.get("port"), function(){
  console.log("Server is listening on port 5000, darling...");
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



//var router = require('./routes/router');

//code from Heroku node.js set up////
//pg.defaults.ssl = true;

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
  //res.sendFile(path.resolve("views/index.html"));
});



// app.use('/', router);
module.exports=app;
