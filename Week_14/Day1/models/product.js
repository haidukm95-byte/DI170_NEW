import { pool } from "../config/neondb.js";
export const getAllProducts = () => {
  return pool.query("select id, name, price from products");
};

export const createNewProduct = (name, price) => {
  return pool.query("insert into products (name, price) values($1, $2),", [
    name,
    price,
  ]);
};
