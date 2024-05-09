import { _addStock, _getStockByProductId, _getStocks } from "../services/stock-service";

export const getStockByProductId = async (req, res, next) => {
  const product_id = req.params.product_id;
  const { isFound, stock, message } = await _getStockByProductId(product_id);
  if (isFound) {
    res.status(200).send({ isFound, stock, message });
  } else {
    res.status(404).send({ isFound, stock, message });
  }
};

export const getStocks = async (req, res, next) => {
  const { isFound, stock, message } = await _getStocks();
  if (isFound) {
    res.status(200).send({ isFound, stock, message });
  } else {
    res.status(404).send({ isFound, stock, message });
  }
};

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
