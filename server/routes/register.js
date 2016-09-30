var express = require('express');
var passport = require("passport");
var Strategy = require('passport-local').Strategy;
var pg = require('pg');

var router = express.Router();
var connectionString = require("../modules/connection");


router.post('/', function(req, res) {
  var registerResults = [];//mherman
  var registerData = {text:req.body.text, complete: false};//mherman

  pg.connect(connectionString, function(err, client, done) {
      //handle connection errors
    if(err){
      done();
      console.log(err);
      res.sendStatus(500).json({success: false, data:err});
    }//end err handling

    else{
      //SQL Query > Insert Data
      //req.body.stuffNames comes from the addStudentObjectToSend in the studentController.js
      client.query("INSERT INTO users (username, password ) VALUES ($1, $2)",[req.body.username, req.body.password]);

      //SQL Query > Select Data
      // var query = client.query( 'SELECT * FROM students;');//students is a TABLE inside music_studio_trackerDB
      //
      // //Stream back results one row at a time
      // query.on('row', function (row) {
      //   results.push( row);

    }
  });
});//end query push


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views/register.html'));
});

module.exports = router;
