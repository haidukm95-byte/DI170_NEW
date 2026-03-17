import { getAllProducts } from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const result = await getAllProducts();
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "no products found" });
  }
};
