const http = require('http');
const server = http.createServer((req, res)=>{
   const url = req.url;
   if(url === '/hi'){
     res.writeHead(200);
      res.write('Hi Welcome');
   }else if (url === '/hello'){

      res.write('Hello Buddy');
     res.writeHead(200);
   }else{
      res.write('404 File not found error');
     res.writeHead(404);
   }   
      return res.end();
});
server.listen(3000);