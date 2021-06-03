var fs = require("fs");
var data = 'Node.js is an ultimate backend javascript for backend developement';

// Create a writable stream
var writerStream = fs.createWriteStream('Big_data.txt');

for (let i = 0; i < 10 ^ 5; i++) {
  writerStream.write(data, 'UTF8');
}

// Mark the end of file
writerStream.end();

// Handle stream events --> finish, and error
writerStream.on('finish', function () {
  console.log("Write completed.");
});

writerStream.on('error', function (err) {
  console.log(err.stack);
});
