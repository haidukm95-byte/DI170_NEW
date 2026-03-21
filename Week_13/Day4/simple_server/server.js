//Requiring http module
const http = require("http");
//creating a server
const server = http.createServer((request, response) => {
  /*  // everything what I can see in "Network" tab of Developer tools, is output by this request
  console.log("headers", request.headers);
  console.log("method", request.method);
  console.log("url", request.url);
  //html text type is set for further UI editing
  response.setHeader("Content-Type", "text/html");
  //tagging end of the response
  response.end("<h1>Test server active</h1>");
});
*/

  //  VARIANT WITH JSON.STRINGIFYING OBJECT (ACTUALLY A GOOD IDEA FOR API CREATION!)

  console.log("method", request.method); //output in console: method GET
  console.log("url", request.url); //output in console: url /     and url /favicon.ico
  const user = {
    name: "John",
    hobby: "skating",
  };
  response.setHeader("Content-Type", "application/json");
  //tagging end of the response
  response.end(JSON.stringify(user)); //the json string (former js object) is output in the browser
});
//command to start server at port no. 3001
server.listen(3001);
//after node server.js the server is launched
