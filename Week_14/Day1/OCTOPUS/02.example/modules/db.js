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

function createUser({ user }) {
  return db("users")
    .insert({
      name: user,
    })
    .returning("*");
}

module.exports = {
  createUser,
};
