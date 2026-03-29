const express = require("express");
const app = express();
const products_routes = require("./routes/products.js");
const port = 5000;

app.use(express.json());
app.use("/api/products", products_routes);

app.listen(5000, () => {
  console.log(`server is listening on port ${port}}`);
});
