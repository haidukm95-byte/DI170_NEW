var express = require("express");
var responseTime = require("response-time");

var app = express();

//calculates the time it takes each request to respond back to the browser.
//We could use this middleware function to log it to the console, or send it
//to a database or 3rd party API service for graphing.
app.use(
  responseTime(function (req, res, time) {
    console.log("time: ", time);
  }),
);

app.get("/", function (req, res) {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Running on 3000");
});
