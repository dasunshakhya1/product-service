import { _addStock, _getStockByProductId } from "../services/stock-service";

export const addStock = async (req, res, next) => {
  const { product_id, min, max, current, threshold } = req.body;

  _addStock({ product_id, min, max, current, threshold }).then((data) => {
    const { isFound, stock } = data;
    if (isFound) {
      res.status(201).send({ stock });
    } else {
      res.status(400).send({ message: "stock already exist" });
    }
  });
};

export const getStockByProductId = async (req, res, next) => {
  const product_id = req.params.product_id;

  try {
    const { isFound, stock } = await _getStockByProductId(product_id);
    if (isFound) {
      res.status(200).send({ stock });
    } else {
      res.status(404).send({ message: `Stock with ${product_id} not found` });
    }
  } catch (error) {
    next(error);
  }
};
