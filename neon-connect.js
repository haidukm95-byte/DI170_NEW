const { Client } = require("pg");

const client = new Client({
  connectionString: "your-connection-string-here", // Replace with output from neonctl connection-string
});

client
  .connect()
  .then(() => console.log("Connected to Neon!"))
  .catch((err) => console.error("Connection error", err))
  .finally(() => client.end());
