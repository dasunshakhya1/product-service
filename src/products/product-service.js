import {
  createProductDB,
  getAllProductDB,
  getProductByIdDB,
  getProductByNameDB,
} from "./product-repository";

export const _getAllProducts = async () => {
  const rows = await getAllProductDB();
  const products = [];

  rows.forEach((r) => {
    const { product_id, price, name } = r;
    products.push({ product_id, price, name });
  });

  return products;
};

export const _getProductById = async (productId) => {
  const rows = await getProductByIdDB(productId);

  if (rows) {
    const { product_id, name, price } = rows;
    return {
      product_id,
      name,
      price,
    };
  }
  return {};
};

export const _createProduct = ({ name, price }) => {
  return createProductDB({ name, price });
};

export const _getProductByName = async (name) => {
  const rows = await getProductByNameDB(name);
  const products = [];

  rows.forEach((r) => {
    const { product_id, price, name } = r;
    products.push({ product_id, price, name });
  });

  return products;
};
