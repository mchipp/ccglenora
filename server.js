var http = require('http');
var fs = require("fs");

http.createServer(function (request, response) {
  if (request.url === "/index.html") {
    sendFileContent(response, "index.html", "text/html");
  }
  else if (request.url === "/works.html") {
    sendFileContent(response, "works.html", "text/html");

  }
  else if (request.url === "/news.html") {
    sendFileContent(response, "news.html", "text/html");

  }
  else if (request.url === "/where.html") {
    sendFileContent(response, "where.html", "text/html");

  }
  else if (request.url === "/") {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
  }
  else {
    console.log("Requested URL is: " + request.url);
    response.end();
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