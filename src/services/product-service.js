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

  return { isFound, products: data };
};

export const _createProduct = async ({ id, name, measureUnit, volume }) => {
  const { isFound, data } = await getProductByIdDB(id);
  if (isFound) {
    return { isCreated: false, products: data };
  } else {
    const { isFound } = await createProductDB({
      id,
      name,
      measureUnit,
      volume,
    });
    if (isFound) {
      return {
        isCreated: isFound,
        products: { id, name, measureUnit, volume },
      };
    }
  }
};

export const _getProductByName = async (name) => {
  const { isFound, data } = await getProductByNameDB(name);
  return { isFound, products: data };
};
