import { executeQuery } from "../utils/db";
import { returnData } from "./repo-util";

export const getStockByProductIdDB = async (product_id) => {
  const query = `SELECT * FROM  supermart.stock where product_id='${product_id}'`;

  const rows = await executeQuery(query);

  if (rows.length > 0) {
    return returnData(true, rows[0]);
  }
  return returnData(false, {});
};

export const createStockDB = async ({
  product_id,
  measure_unit,
  min_volume,
  max_volume,
  reorder_threshold,
  current_volume,
}) => {
  const query = `INSERT INTO supermart.stock(product_id,
  measure_unit,
  min_volume,
  max_volume,
  reorder_threshold,
  current_volume) values('${product_id}','${measure_unit}',${min_volume},${max_volume},${reorder_threshold},${current_volume})`;

  const rows = await executeQuery(query);

  if (rows.affectedRows == 1) {
    return returnData(true, rows.insertId);
  }
  return returnData(false, {});
};

export const getStocksDB = async () => {
  const query = `SELECT * FROM supermart.stock`;
  const rows = await executeQuery(query);

  if (rows.length > 0) {
    return returnData(true, rows);
  } else {
    return returnData(false, {});
  }
};
