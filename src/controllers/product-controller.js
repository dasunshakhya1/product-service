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
  const { id, name, measureUnit, volume } = req.body;
  _createProduct({ id, name, measureUnit, volume })
    .then((product) => {
      if (product.isCreated) {
           res.status(201).send({products:product.products });
      } else {
         res
           .status(409)
           .send({ message: `Product with ${id} exist` });
      }
   
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
