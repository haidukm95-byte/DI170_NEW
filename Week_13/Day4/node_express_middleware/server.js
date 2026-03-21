//npm install express
//for more information about routing:
// https://expressjs.com/en/guide/routing
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("<h1>Helllooooo!</h1>");
  next(); //to pass to the next function
}); //express middleware function

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(3000);
