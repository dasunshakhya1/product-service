import { getProductByIdDB } from "../repositories/product-repository";
import {
  createStockDB,
  getStockByProductIdDB,
} from "../repositories/stock-repository";

export const _addStock = async ({
  product_id,
  measure_unit,
  min_volume,
  max_volume,
  reorder_threshold,
  current_volume,
}) => {
  const { isFound } = await getProductByIdDB(product_id);

  if (isFound) {
    const { isFound } = await getStockByProductIdDB(product_id);

    if (!isFound) {
      await createStockDB({
        product_id,
        measure_unit,
        min_volume,
        max_volume,
        reorder_threshold,
        current_volume,
      });
      const { data } = await getStockByProductIdDB(product_id);
      return {
        isNewStock: true,
        isProductFound: true,
        isCreated: true,
        stock: data,
        message: `Stock Crated!!!`,
      };
    } else {
      return {
        isNewStock: false,
        isProductFound: true,
        isCreated: false,
        stock: {},
        message: `Stock with product id ${product_id} is already exist`,
      };
    }
  } else {
    return {
      isProductFound: false,
      isCreated: false,
      isNewStock: false,
      stock: {},
      message: `Product with id ${product_id} not found`,
    };
  }
};
