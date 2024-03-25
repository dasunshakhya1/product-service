import { executeQuery } from "../utils/db";
import { returnData } from "./repo-util";

export const getStockByProductIdDB = async (product_id) => {
  const query = `SELECT * FROM  supermart.stocks where product_id=${product_id}`;

  const rows = await executeQuery(query);

  if (rows.length > 0) {
    return returnData(true, rows[0]);
  }
  return returnData(false, {});
};

export const createStockDB = async ({
  product_id,
  min,
  max,
  current,
  threshold,
}) => {
  const query = `INSERT INTO supermart.stocks(product_id,min,max,current,threshold) values(${product_id},${min},${max},${current},${threshold})`;

  const rows = await executeQuery(query);

  if (rows.length > 0) {
    return returnData(true, {});
  } else {
    return returnData(false, {});
  }
};
