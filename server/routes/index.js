//server side
/** Provides basic route for providing initial package
* to client.
* @module routes/index
*/
var express = require('express');
var router = express.Router();
var path = require('path');

router.post('/');
/** GET - send client top-level index.html page
* @return index.html
*/

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});
console.log('this ran from login.js route');

module.exports = router;
