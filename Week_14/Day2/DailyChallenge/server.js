const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const router = require("./routes/router.js");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);
app.listen(port, () => console.log(`Running on http://localhost:${port}`));
