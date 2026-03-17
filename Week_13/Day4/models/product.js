import { pool } from "../config/neondb.js";
export const getAllProducts = () => {
  return pool.query("select id, name, price from products");
};
