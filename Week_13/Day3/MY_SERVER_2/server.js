const http = require("http");
const fs = require("fs");
const path = require("path");
const contentTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
};

const server = http.createServer((request, response) => {
  const url = request.url === "/" ? "/index.html" : request.url;
  const ext = path.extname(url);
  const filePath = path.join(__dirname, "../../../Week_12/Star Wars", url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("<h1>404 Not Found</h1>");
      return;
    }
    response.writeHead(200, { "Content-Type": contentTypes[ext] || "text/plain" });
    response.end(data);
  });
});
const PORT = 3000;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
