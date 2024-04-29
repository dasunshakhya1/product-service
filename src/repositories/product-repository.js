import { executeQuery } from "../utils/db";
import { returnData } from "./repo-util";

export const getAllProductDB = async () => {
  const query = "SELECT * FROM supermart.product";
  const rows = await executeQuery(query);
  if (rows.length > 0) {
    return returnData(true, rows);
  }
  return returnData(false, {});
};

export const getProductByIdDB = async (productId) => {
  const query = `SELECT * FROM supermart.product where product_id='${productId}'`;
  const rows = await executeQuery(query);

  if (rows.length > 0) {
    return returnData(true, rows[0]);
  }
  return returnData(false, {});
};

export const createProductDB = async ({ id, name, measureUnit, volume }) => {
  const query = `INSERT INTO supermart.product(product_id,product_name,product_measure_unit,product_volume) values('${id}','${name}','${measureUnit}',${volume})`;
  const rows = await executeQuery(query);
  if (rows.affectedRows == 1) {
    return returnData(true, rows.insertId);
  }
  return returnData(false, {});
};

export const getProductByNameDB = (productName) => {
  const query = `SELECT *  FROM supermart.product WHERE name='${productName}'`;

  return executeQuery(query);
};
