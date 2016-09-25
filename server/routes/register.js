var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require("passport");

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views/register.html'));
});
router.post("/", function(req, res, next) {
  pg.connect(connectionString, function( err, client ){

    var query = client.query('INSERT INTO user (username, password) VALUES ($1, $2)', [request.body.username, request.body.password]);

    query.on('error', function(err){
      console.log(err);
    });

    query.on('end', function(){
      response.sendStatus(200);
      client.end();
    });
  });

});
module.exports = router;
