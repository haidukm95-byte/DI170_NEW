//Response Header example

//To add a header to the response, we need to add
// a function before the res.end() function
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // req.url === "/" means homepage url
    res.end("<h1>Home page</h1>");
  } else if (req.url === "/about") {
    res.end("<h1>About page</h1>");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(5000, "localhost", () => {
  console.log("Server is listening at localhost on port 5000");
});

/*
Explanations:

    The writeHead function allows you to specify the content type of the message, here ‘text/html’

    The statusCode method sets the HTTP status code.
        200 translates to OK.
        404 translates to Not Found.

    HTTP headers let the client and the server pass additional information with an HTTP request or response. 
    We use the Content-Type header and set it to text/html.

    When running the res.end() function NodeJS will include the Header to the response. The server now knows 
    that the message is complete. This method must be called on each response.
        We pass the data '<h1>Page not found</h1>' as the only parameter
*/
