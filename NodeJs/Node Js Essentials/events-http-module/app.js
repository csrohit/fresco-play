

const http = require('http');
const fs = require('fs')


const server = http.createServer((req, res)=>{

fs.readFile('sample.html', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  res.write(data);
  res.end();
})

});
server.listen(8000);