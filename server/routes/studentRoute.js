//server side
var express = require('express');
var router = express.Router();//var passport = require('passport');
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/music_studio_tracker';

console.log('this ran from studentRoute.js');
// Handles request for HTML file

// Handles POST request with new user data
router.post('/', function(req, res) {
  var results = [];//mherman
  var data = {text:req.body.text, complete: false};//mherman
    console.log( req.body );

  pg.connect(connectionString, function(err, client, done) {
      //handle connection errors
    if(err){
      done();
      console.log(err);
      res.sendStatus(500).json({success: false, data:err});
    }//end err handling

    //SQL Query > Insert Data
    //req.body.stuffNames comes from the addStudentObjectToSend in the studentController.js
    client.query("INSERT INTO students (first_name, last_name, lesson_day, lesson_time, email, phone_number, current_balance, makeup_lessons,wait_list, lesson_rate ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",[req.body.first, req.body.last, req.body.lessonDay, req.body.lessonTime, req.body.email, req.body.phoneNumber, req.body.currentBalance,req.body.makeupLessons,req.body.waitList, req.body.lessonRate]);

    //SQL Query > Select Data
    var query = client.query( 'SELECT * FROM students;');//students is a TABLE inside music_studio_trackerDB

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
  console.log("router.get from studentRoute.js!");
  var allStudents = [];
    pg.connect(connectionString, function(err, client, done){
      //SQL Query > Select Data
      var studentQuery = client.query( 'SELECT * FROM students;');//students is a TABLE inside music_studio_trackerDB

      console.log('query ', studentQuery);
      //Stream results back one row at a time

      var rows = 0;
      studentQuery.on('row', function (row) {

      allStudents.push( row);

      });//end query push

    //After all data is returned, close connection and return results
    studentQuery.on ( 'end', function(){
      console.log("all Students!", allStudents);
      return res.json( allStudents );
    });
    //Handle connection errors
    if( err ){
      console.log(err);
    }
  });
});

module.exports = router;
