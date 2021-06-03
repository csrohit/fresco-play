var fs = require("fs");

// Create a readable stream
var readerStream = fs.createReadStream('data_file.txt');

// Create a writable stream
var writerStream = fs.createWriteStream('new_data_file.txt');

// Pipe the read and write operations
// read input.txt and write data to output.txt
readerStream.pipe(writerStream);