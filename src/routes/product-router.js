import express from 'express'
import { getProducts } from '../controller/product-controller'


const productRouter = express.Router()


productRouter.get('/', (req, res,next) => {
    getProducts(req,res,next)
    
})

















export default productRouter