import { getAllProducts } from "../service/product-service";

export const getProducts = (req, res, next) => {
  getAllProducts()
    .then((products) => res.status(200).send({ products }))
    .catch((err) => next(err));
};
