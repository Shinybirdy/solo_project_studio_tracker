//server side
var express = require('express');
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
var path = require('path');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});
//THIS isn't working!!!********************************
router.post('/',
  passport.authenticate('local', {
    successRedirect:'/user',
    failureRedirect: "/login"
  }),
  function(req, res){
    res.redirect('/');
  }
);


console.log('this ran from index.js route which is actually login');

module.exports = router;
