const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const OK = 200;
const NOT_FOUND = 404;

const requestListener = function (req, res) {
  const filepath = './src' + (req.url == '/' ? '/index.html' : req.url);
  let fileExtension = path.extname(filepath);
  const mime = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.ico': 'image/ico',
  };

  let content = mime[fileExtension];

  console.log(filepath);
  console.log(content);

  fs.readFile(filepath, (err, data) => {
    if (err) console.log(err.code == 'ENOENT' ? NOT_FOUND : 500);
    res.writeHead(OK, { 'Content-Type': content });
    res.end(data, 'utf-8');
  });
};

const server = http.createServer(requestListener);
server.listen(PORT, () => console.log(`Runnin on port ${PORT}`));
