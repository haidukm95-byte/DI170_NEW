const exp = require("express");
const bp = require("body-parser");
const DB = require("./modules/db.js");
const bcrypt = require("bcrypt");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "ep-falling-fog-anvs1dzl-pooler.c-6.us-east-1.aws.neon.tech",
    port: 5432,
    user: "neondb_owner",
    password: "npg_ROk0qN1vAdLI",
    database: "neondb",
    ssl: { rejectUnauthorized: false },
  },
});

const app = exp();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use("/", exp.static(__dirname + "/public"));

app.post("/user", (req, res) => {
  console.log(req.body);
  DB.createUser(req.body)
    .then((data) => {
      res.send({ message: "OK" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: err.detail || err.message });
    });
});

app.get("/show", (req, res) => {
  db("users")
    .select("name")
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: err.detail });
    });
});

app.post("/find", (req, res) => {
  console.log(req.body);
  const { user, pass } = req.body;
  db("users")
    .select("id", "name", "password")
    .where({ name: user })
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        if (bcrypt.compareSync(pass, data[0].password)) {
          res.send({ message: `Welcome ${data[0].username}` });
        } else {
          res.send({ message: "Wrong password" });
        }
      } else {
        res.send({ message: "Not Found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: err.detail });
    });
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));
