import { _addStock } from "../services/stock-service";

export const addStock = async (req, res, next) => {
  const {
    product_id,
    measure_unit,
    min_volume,
    max_volume,
    reorder_threshold,
    current_volume,
  } = req.body;

  _addStock({
    product_id,
    measure_unit,
    min_volume,
    max_volume,
    reorder_threshold,
    current_volume,
  })
    .then((st) => {
      const { isNewStock, isProductFound, isCreated, stock, message } = st;

      if (isProductFound && isNewStock && isCreated) {
        res.status(201).send({
          isCreated,
          isProductFound,
          isNewStock,
          stock,
          message,
        });
      }
      if (isProductFound && !isNewStock) {
        res.status(409).send({
          isCreated,
          isProductFound,
          isNewStock,
          stock,
          message,
        });
      }

      if (!isProductFound) {
        res.status(400).send({
          isCreated,
          isProductFound,
          isNewStock,
          stock,
          message,
        });
      }
    })
    .catch((err) => next(err));
};
