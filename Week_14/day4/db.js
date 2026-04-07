import knex from "knex";
import { Pool } from "pg";

const PGHOST = "ep-winter-shape-a2rbuxds-pooler.eu-central-1.aws.neon.tech";
const PGDATABASE = "neondb";
const PGUSER = "neondb_owner";
const PGPASSWORD = "npg_ikZ39nTDxfhw";
const PGPORT = 5432;

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

const pool = new Pool({
  host: PGHOST,
  port: PGPORT,
  user: PGUSER,
  database: PGDATABASE,
  password: PGPASSWORD,
  ssl: { rejectUnauthorized: false },
});

const result = await pool.query('select * from products where id = $1 and name = $2', [3, 'iphone'])
console.log(result.rows);


// db("products")
//   .where("id", ">=", 2)
//   .orderBy("name")
//   .select("id", "price", "name")

// db("products")
//   .insert(
//     [
//       { name: "iPhone16", price: 666 },
//       { name: "iPhone17", price: 777 },
//     ],
//     ["id", "name"],
//   )
//   .returning('*')

// db("products")
//   .update({ price: 999 }, ["id", "price"])
//   .where({ id: 7 })
// //   .returning('*')

// db("products")
//   .where({ id: 8 })
//   .del()
//   .returning("*")
//   .then((rows) => console.log(rows))
//   .catch((err) => console.log(err));
