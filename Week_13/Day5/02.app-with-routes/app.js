const express = require("express");
const usersRouter = require("./routes/router.js");
const port = 3882;

const app = express();

app.use(express.json());
app.use("/", usersRouter);

app.listen(port, () => {
  console.log("Server is running on", +port);
});
