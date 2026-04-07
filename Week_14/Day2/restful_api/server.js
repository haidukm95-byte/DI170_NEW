const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public")); //__dirname for a project`s root directory
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/:id", (req, res) => {
  //console.log(req.query); // in such a format: ?name=user&age=30
  //req.body;
  //console.log(req.header);
  console.log(req.params);
  if (!req.params) res.status(404).send("not found");
  res.status(200).send("getting root");
});

app.listen(3000, () => console.log("http://localhost:3000"));
