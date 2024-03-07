var http = require('http');
var fs = require("fs");
const path = require('path');

http.createServer(function (request, response) {
  const fileName = request.url.replace(/^\/+/, '');

  if (fileName === ''){
    sendFileContent(response, "index.html", "text/html");
  }
  else if (path.extname(fileName) === '.html') {
    sendFileContent(response, fileName, "text/html");
  }

  function sendFileContent(response, fileName, contentType) {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        response.writeHead(404);
        response.write("Not Found!");
      }
      else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.write(data);
      }
      response.end();
    });
  }
}).listen(3000);