const express = require("express");
const app = express();
const port = 3000;

app.use(logger); //usually is put at the top of all the app. calls
app.use(auth); //usually is put at the top of all the app. calls

app.get("/", (req, res, next) => {
  //next is added because of Middleware function logger() after app.get calls!
  res.send("Home Page");
});

app.get("/users", (req, res, next) => {
  console.log(`User is admin=${req.admin}`);
  console.log("Users Page");
  res.send("Users Page");
  next();
});

function logger(req, res, next) {
  console.log(req);
  next();
}

function auth(req, res, next) {
  if (req.query.admin === "true") {
    req.admin = true;
    next();
  } else {
    res.send("No auth");
  }
}

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
