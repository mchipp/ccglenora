var http = require('http');
var fs = require("fs");
 
http.createServer(function(request, response) {
    if(request.url === "/index.html"){
		sendFileContent(response, "index.html", "text/html");
     }
     else if(request.url === "/"){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
     }
     else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
        sendFileContent(response, request.url.toString().substring(1), "text/css");
     }      
     else{
		console.log("Requested URL is: " + request.url);
        response.end();
     }

     function sendFileContent(response, fileName, contentType){
       fs.readFile(fileName, function(err, data){
         if(err){
           response.writeHead(404);
           response.write("Not Found!");
         }
         else{
           response.writeHead(200, {'Content-Type': contentType});
           response.write(data);
         }
         response.end();
       });
     }
}).listen(3000);