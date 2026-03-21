/* Example

The http.createServer() method includes request and response parameters which are supplied by Node.js

The request object can be used to get information about the current HTTP request (e.g. URL, request header, and data).

The response object can be used to send a response for a current HTTP request.
*/

const http = require("http");
const server = http.createServer((req, res) => {
  //1.
  res.statusCode = 200;
  //2.
  res.setHeader("Content-Type", "text/html");
  //3
  res.end("<h1>Hello World</h1>");
});

server.listen(5000);
console.log("Node.js web server at port 5000 is running..");

/*
    response.end([data[, encoding]][, callback]) : This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete.
    The method, response.end([data[, encoding]][, callback]), MUST be called on each response.
    response.end() documentation
*/
