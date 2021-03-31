const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const OK = 200;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERR = 500;

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

  fs.readFile(filepath, (err, data) => {
    let MSG = OK;
    if (err) MSG = err.code == 'ENOENT' ? NOT_FOUND : INTERNAL_SERVER_ERR;
    res.writeHead(OK, { 'Content-Type': content });
    res.end(data, 'utf-8');
    console.log(MSG, '-', filepath);
  });
};

const server = http.createServer(requestListener);
server.listen(PORT, () => console.log(`Runnin on port ${PORT}`));
