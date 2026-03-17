import express from "express";
import productsRouter from "./routes/products.js";

const app = express();
const PORT = 3001;
app.listen(PORT, () => console.log(`run on ${PORT}`));

app.use("/api/products", productsRouter);
