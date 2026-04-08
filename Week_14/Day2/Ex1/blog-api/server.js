const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const router = require("./routes/router.js");
const postController = require("./controllers/Postcontroller.js");

app.use("/", router);
app.listen(port, () => console.log(`Running on http://localhost:${port}`));
