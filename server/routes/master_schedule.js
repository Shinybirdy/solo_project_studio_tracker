//server side
var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require("../modules/connection");

console.log('master_schedule.js is running');

router.get('/', function(req,res){
  console.log("router.get from master_scheduleRoute.js!");

  var allLessons = [];
    pg.connect(connectionString, function(err, client, done){
      //SQL Query > Select Data
      var studentLessonQuery = client.query( "SELECT * FROM students ORDER BY lesson_day ASC");

      //students is a TABLE inside music_studio_trackerDB

      console.log('query ', studentLessonQuery);
      //Stream results back one row at a time

      var rows = 0;
      studentLessonQuery.on('row', function (row) {

      allLessons.push( row);

      });//end query push

    //After all data is returned, close connection and return results
    studentLessonQuery.on ( 'end', function(){
      console.log("all Lessons!", allLessons);
      return res.json( allLessons );
    });
    //Handle connection errors
    if( err ){
      console.log(err);
    }
  });
});
console.log('this ran from master schedule-js');


module.exports = router;
