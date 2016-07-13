//server side
var express = require('express');
var router = express.Router();
var path = require('path');

router.post('/');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});
console.log('this ran from login.js route');

module.exports = router;
