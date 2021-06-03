var fs = require("fs");
var data = '';

// Create a readable stream
var readerStream = fs.createReadStream('Node-stream-handson/data_file.txt');

// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
   console.log(chunk.length);
});

readerStream.on('end',function() {
  //  console.log(data);
   console.log(data.length);
});

readerStream.on('error', function(err) {
   console.log(err.stack);
});

console.log("Program Ended");