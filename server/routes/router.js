//server side
var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/music_studio_tracker';
//var connectionString = require(path.join(__dirname, '../','../','config' ));
console.log("hi, from router.js");

module.exports = router;
