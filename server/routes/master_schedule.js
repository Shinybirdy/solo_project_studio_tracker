//server side
var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');

var connectionString = 'postgres://localhost:5432/music_studio_tracker';

router.post('/');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});
console.log('this ran from master schedule-js');


module.exports = router;
