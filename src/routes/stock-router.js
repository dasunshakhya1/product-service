import express from "express";
import { addStock, getStockByProductId } from "../controllers/stock-controller";

const stockRouter = express.Router();

stockRouter.post("/", (req, res, next) => {
  addStock(req, res, next);
});

stockRouter.get("/:product_id", (req, res, next) => {
  getStockByProductId(req, res, next);
});

export default stockRouter;
