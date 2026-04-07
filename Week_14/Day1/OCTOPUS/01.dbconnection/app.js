/*Initializing the Library
We will work with PostgreSQL Database
The knex module is itself a function which takes a configuration object for Knex, accepting 
a few parameters. The client parameter is required and determines which client adapter will be used 
with the library.
Note: The database version can be added in knex configuration, when you use the PostgreSQL adapter 
to connect a non-standard database.
*/
const express = require("express");
const app = express();
const app2 = express();
const app3 = express();
const db = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "ep-bitter-tree-am6owpc0-pooler.c-5.us-east-1.aws.neon.tech",
    user: "neondb_owner",
    password: "npg_cgGCN0B4UkOE",
    database: "neondb",
    port: 5432,
    ssl: { rejectUnauthorized: false },
  },
});

const db2 = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "ep-cold-violet-ajshk01w-pooler.c-3.us-east-2.aws.neon.tech",
    user: "neondb_owner",
    password: "npg_Zi6xCnHrU9yT",
    database: "neondb",
    port: 5432,
    ssl: { rejectUnauthorized: false },
  },
});
app.set("db", db);

app.get("/", (req, res) => {
  db.select()
    .from("products")
    .where({ id: 1 })
    .then((products) => res.send(products));
});

app2.get("/", (req, res) => {
  db2("users_tasks")
    .returning(["taskuid", "useruid", "task", "datetime", "isdone"])
    .insert({
      useruid: "1",
      task: "doing week 14 homework",
      datetime: "2026-06-04 18:00:00",
      isdone: false,
    })
    .then((users_tasks) => res.send(users_tasks));
});

app3.get("/", (req, res) => {
  db2
    .select()
    .from("users")
    .then((users) => res.send(users));
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
app2.listen(3500, () => console.log("Example app listening on port 3500!"));
app3.listen(4000, () => console.log("Example app listening on port 4000!"));
