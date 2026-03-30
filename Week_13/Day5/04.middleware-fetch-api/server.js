const exp = require("express");
const bp = require("body-parser");
const fs = require("fs");

const app = exp();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use("/", exp.static(__dirname + "/public"));

app.post("/user", (req, res) => {
  console.log(req.body);
  let users = [];
  try {
    const f = fs.readFileSync("./users");
    users = JSON.parse(f);
  } catch (e) {
    console.log(e);
  } finally {
    users.push(req.body);
  }

  fs.writeFile("./users", JSON.stringify(users), (err) => {
    if (err) {
      console.log("error writing to file");
    }
  });
  res.send({ message: "OK" });
});

app.get("/show", (req, res) => {
  let users = [];
  try {
    const f = fs.readFileSync("./users");
    users = JSON.parse(f);
  } catch (e) {
    return res.json([]);
  }
  res.send(users);
});
app.listen(3000);
