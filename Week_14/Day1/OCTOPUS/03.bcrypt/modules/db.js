const knex = require("knex");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

function createUser({ user, pass }) {
  const salt = bcrypt.genSaltSync(saltRounds);

  return db("users")
    .insert({
      name: user,
      password: bcrypt.hashSync(pass, salt),
    })
    .returning("*");
}

module.exports = {
  createUser,
};
