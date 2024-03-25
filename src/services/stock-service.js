import {
  createStockDB,
  getStockByProductIdDB,
} from "../repositories/stock-repository";

export const _addStock = async ({
  product_id,
  min,
  max,
  current,
  threshold,
}) => {
  const { isFound, data } = await getStockByProductIdDB(product_id);

  if (!isFound) {
    await createStockDB({
      product_id,
      min,
      max,
      current,
      threshold,
    });
    const { data } = await getStockByProductIdDB(product_id);
    return { isFound: true, stock: data };
  }
  return { isFound: false, data };
};

export const _getStockByProductId = async (product_id) => {
  const { isFound, data } = await getStockByProductIdDB(product_id);

  if (isFound) {
    return { isFound, stock: data };
  }
  return { isFound, stock: {} };
};
