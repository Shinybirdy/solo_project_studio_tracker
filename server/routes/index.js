//server side
var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require("passport");

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.post('/',
  passport.authenticate('local', {
    successRedirect:'/users',
    failureRedirect: "/"
  })
);


console.log('this ran from login.js route');

module.exports = router;
