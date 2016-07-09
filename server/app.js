//server side
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var connectionString = 'postgres://localhost:5432/music_studio_tracker';

app.set("port",(process.env.PORT || 5000));

app.listen(app.get("port"), function(){
  console.log("Server is listening on port 5000, darling...");
});
app.get('/*',function(req,res){
  var file = req.params[0] || "views/index.html";
  res.sendFile(path.join(__dirname,"/public/",file));
});

app.use(express.static('public'));

module.exports=app;
