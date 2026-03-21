//npm install express
//for more information about routing:
// https://expressjs.com/en/guide/routing
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Getting root");
});
app.get("/", (req, res) => {
  res.send("Gettin profile");
});

app.post("/profile", (req, res) => {
  //res.send("<h1>Hello</h1>"); text/html (automatically converted with express module!)
  const user = {
    name: "Marko",
    age: "30",
  };
  res.send(user); //automatically converted to JSON with express module!
});

app.listen(3001);
