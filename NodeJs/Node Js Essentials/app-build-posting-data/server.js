const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');





const server = http.createServer((req, res) => {

  const urlparse = url.parse(req.url, true);

  if (urlparse.pathname == '/' && req.method == 'POST') {
    req.on('data', data => {
      const jsondata = JSON.parse(data);
      fs.writeFile('output.txt', data, err => {
        if (err) {
          console.error(err)
          return
        }
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(projects, null, 2));

    });
  }

});


server.listen(8000);