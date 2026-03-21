import express from "express";
import productsRouter from "./routes/products.js";
import path from "path";

const app = express();
const PORT = 3001;
app.listen(PORT, () => console.log(`run on ${PORT}`));
const __dirname = path.resolve();

app.use("/", express.static(__dirname + "/public"));
app.use("/api/products", productsRouter);
