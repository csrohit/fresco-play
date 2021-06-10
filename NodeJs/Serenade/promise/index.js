var express = require('express');
var app = express();
var fs = require('fs');

app.get( '/users', function(req,res) {
  fs.readFile('./users.json', 'utf-8', function(err, data) {

    if(err) {
      console.error("unable to read file");
    }
    else {
      try {
          data = JSON.parse(data);
          res.send(data);
      }
      catch (e) {
          console.error("invalid json file");
      }
    }
  });
});
app.listen(3000,function(){
  console.log("listening on port 8000");
});