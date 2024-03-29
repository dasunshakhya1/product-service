import {
  _createProduct,
  _getAllProducts,
  _getProductById,
  _getProductByName,
} from "../services/product-service";

export const getProducts = async (req, res, next) => {
  try {
    const { isFound, products } = await _getAllProducts();
    res.status(200).send({ products });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  const productId = req.params.productId;

  const { isFound, product } = await _getProductById(productId);
  if (isFound) {
    res.status(200).send({ product });
  } else {
    res.status(404).send({ message: `Product with ${productId} not found` });
  }
};

export const addProduct = (req, res, next) => {
  const { name, price } = req.body;
  _createProduct({ name, price })
    .then((product) => {
      res.status(201).send({ product });
    })
    .catch((err) => next(err));
};

export const getProductByName = (req, res, next) => {
  const { name } = req.body;
  _getProductByName(name)
    .then((product) => {
      if (product.length > 0) {
        res.status(200).send({ product });
      } else {
        res.status(404).send({
          message: `Product with ${productId} not found`,
          status: "Not Found",
        });
      }
    })
    .catch((err) => next(err));
};
