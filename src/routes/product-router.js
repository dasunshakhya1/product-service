import express from 'express'
import {
  addProduct,
  getProduct,
  getProductByName,
  getProducts,
} from "../controllers/product-controller";




const productRouter = express.Router()

productRouter.get("/:productId", (req, res, next) => {
  getProduct(req, res, next);
});


productRouter.get('/', (req, res,next) => {
    getProducts(req,res,next)
    
})

productRouter.post('/', (req, res, next) => {
  addProduct(req,res,next)
})

productRouter.post('/name', (req, res, next) => {
  getProductByName(req,res,next)
})


















export default productRouter