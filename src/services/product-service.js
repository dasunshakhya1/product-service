import {
  createProductDB,
  getAllProductDB,
  getProductByIdDB,
  getProductByNameDB,
} from "../repositories/product-repository";

export const _getAllProducts = async () => {
  const { isFound, data } = await getAllProductDB();

  return { isFound, products: data };
};

export const _getProductById = async (productId) => {
  const { isFound, data } = await getProductByIdDB(productId);

  return { isFound, product: data };
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
