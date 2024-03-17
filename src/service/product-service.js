import {
  createProductDB,
  getAllProductDB,
  getProductByIdDB,
  getProductByNameDB,
} from "../repository/product-repository";

export const _getAllProducts = () => {
  return getAllProductDB();
};

export const _getProductById = (productId) => {
  return getProductByIdDB(productId);
};

export const _createProduct = ({ name, price }) => {
  return createProductDB({ name, price });
};

export const _getProductByName = (name) => {
  return getProductByNameDB(name);
};
