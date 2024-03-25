import { executeQuery } from "../utils/db";
import { returnData } from "./repo-util";

export const getAllProductDB = async () => {
  const query = "SELECT * FROM supermart.products";
  const rows = await executeQuery(query);
  if (rows.length > 0) {
    return returnData(true, rows);
  }
  return returnData(false, {});
};

export const getProductByIdDB = async (productId) => {
  const query = `SELECT * FROM supermart.products where product_id=${productId}`;
  const rows = await executeQuery(query);

  if (rows.length > 0) {
    return returnData(true, rows[0]);
  }
  return returnData(false, {});
};

export const createProductDB = ({ name, price }) => {
  const query = `INSERT INTO supermart.products(name,price) values('${name}',${price})`;
  return executeQuery(query);
};

export const getProductByNameDB = (productName) => {
  const query = `SELECT *  FROM supermart.products WHERE name='${productName}'`;

  return executeQuery(query);
};
