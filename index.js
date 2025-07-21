const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 19789;

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );

  let extname = path.extname(filePath);
  if (!extname) {
    filePath += '.html'; // default to .html if no extension is provided
  }

  //simplified because i just have to to serve html files
  let contentType = 'text/html';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      //fnf
      if (err.code === 'ENOENT') {
        fs.readFile(
          path.join(__dirname, 'public', '404.html'),
          (err, content) => {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
          }
        );
      }
      //server error
      else {
        res.writeHead(500);
        res.end('Server error : ' + err.code);
      }
    }
    //success
    else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
