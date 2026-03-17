//POSTGRESQL OPERATIONS IN NODE.JS
//import knex from "knex"; // FURTHER FOR WORK WITH KNEX COMMANDS
//USING PG-POOL
import { Pool } from "pg"; //FOR WORK WITH PG-POOL COMMANDS

const PGHOST = "ep-bitter-tree-am6owpc0-pooler.c-5.us-east-1.aws.neon.tech";
const PGDATABASE = "neondb";
const PGUSER = "neondb_owner";
const PGPASSWORD = "npg_cgGCN0B4UkOE";
const PGPORT = "5432";

const pool = new Pool({
  host: PGHOST,
  port: PGPORT,
  user: PGUSER,
  database: PGDATABASE,
  password: PGPASSWORD,
  ssl: { rejectUnauthorized: false },
});

const result = await pool.query("select * from products where id=$1", [1]);
console.log(result.rows);

/* USING KNEX:
const db = knex({
  client: "pg",
  connection: {
    host: PGHOST,
    port: PGPORT,
    user: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
    ssl: { rejectUnauthorized: false },
  },
});
*/

/*db("products")
  .select("id", "price")
  .where("id", "=", "2") // here we run SQL commands
  .orderBy("name")
  .then((rows) => console.log(rows))
  .catch((err) => console.log(err));  */

//INSERT
/*
db("products")
  .insert([{ name: "iphone13", price: 222 }])
  .returning("*")
  .then((rows) => console.log(rows))
    .catch((err) => console.log(err));

/*
 OR: 
db("products")
  .insert([{ name: "iphone13", price: 222 }], ["id", "name"])
  .then((rows) => console.log(rows))
    .catch((err) => console.log(err)); */

/*db("products")
  .select("*")
  .orderBy("name")
  .then((rows) => console.log(rows))
  .catch((err) => console.log(err)); */

// UPDATE:

/*
db("products")
  .update({ name: "Samsung S24" })
  .where({ id: "4" })
  .returning("*")
  .then((rows) => console.log(rows))
    .catch((err) => console.log(err));
*/
/*
db("products")
  .update({ price: "1300" })
  .where({ id: "4" })
  .returning("*")
  .then((rows) => console.log(rows))
  .catch((err) => console.log(err));
*/

/*DELETE
db("products")
  .where({ id: "2" })
  .del()
  .returning("*")
  .then((rows) => console.log(rows))
  .catch((err) => console.log(err));
  */
