/*Create a middleware that retrieves today's date and the current time (H/M/S)

Create 2 routes

1. Call this middleware before every route

2. Call this middleware before the 2nd route
*/
const express = require("express");
const app = express();

/*1. Global Middleware call
function datetime(req, res, next) {
  const date = new Date();
  req.datetime = date;
  next();
}

app.use(datetime);

app.get("/", (req, res) => {
  res.send(req.datetime);
});

app.get("/settings", (req, res) => {
  res.send(req.datetime);
});

app.listen(3000, () => {
  console.log("Running on http://localhost:3000/");
});

*/

//2. Middleware before 2nd route
function datetime(req, res, next) {
  const date = new Date();
  req.datetime = `${date.toLocaleDateString()} ${date.toLocaleTimeString}`;
  next();
}

app.get("/", (req, res) => {
  res.send("Home route - no datetime middleware");
});

app.get("/settings", datetime, (req, res) => {
  res.send(req.datetime);
});

app.listen(3000, () => {
  console.log("Running on http://localhost:3000/");
});
