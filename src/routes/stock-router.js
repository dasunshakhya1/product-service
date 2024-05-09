import express from "express";
import { addStock, getStockByProductId, getStocks } from "../controllers/stock-controller";

const stockRouter = express.Router();

stockRouter.post("/", (req, res, next) => {
  addStock(req, res, next);
});

stockRouter.get("/:product_id", (req, res, next) => {
  getStockByProductId(req, res, next);
});

stockRouter.get("/", (req, res, next) => {
  getStocks(req,res,next)
})
export default stockRouter;
