var express = require('express');
var router = express.Router();//var passport = require('passport');
var path = require('path');
var pg = require('pg');
var connectionString = require("../modules/connection");

console.log('this ran from studentNotesRoute.js');
// Handles request for HTML file

// Handles POST request with new user data
router.post('/', function(req, res) {
  var results = [];//mherman
  var data = {text:req.body.text, complete: false};//mherman
    console.log( req.body );

  pg.connect(connectionString, function(err, client, done) {
      //handle connection errors
    if(err){
      alert("Uh Oh No NOtes!");
      done();
      console.log(err);
      res.sendStatus(500).json({success: false, data:err});
    }//end err handling

    //SQL Query > Insert Data
    //req.body.stuffNames comes from the addStudentObjectToSend in the studentController.js
    client.query("INSERT INTO notes (student_id, notes) VALUES ($1, $2)",[req.body.studentId]);

    //SQL Query > Select Data
    var query = client.query( 'SELECT * FROM notes;');//students is a TABLE inside music_studio_trackerDB

    //Stream back results one row at a time
    query.on('row', function (row) {
      results.push( row);
    });//end query push

    //After all data is returned, close connection and return results
    query.on('end', function() {
                done();
                return res.json(results);
    });
  });//end pg connect
});//end post

router.get('/', function(req,res){
  console.log("router.get from studentNotesRoute.js!");
  var allNotes = [];
    pg.connect(connectionString, function(err, client, done){
      //SQL Query > Select Data
      var query = client.query( 'SELECT * FROM notes;');//notes is a TABLE inside music_studio_trackerDB

      console.log('query ', query);
      //Stream results back one row at a time

      var rows = 0;
      query.on('row', function (row) {

      allNotes.push( row);

      });//end query push

    //After all data is returned, close connection and return results
    query.on ( 'end', function(){
      console.log("all Students Notes!", allNotes);
      return res.json( allNotes );
    });
    //Handle connection errors
    if( err ){
      console.log(err);
    }
  });
});

module.exports = router;
