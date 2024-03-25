import express from "express";
import productRouter from "../routes/product-router";
import stockRouter from "../routes/stock-router";


const app = express();

app.use(express.json());


app.use('/products', productRouter)
app.use('/stocks',stockRouter)




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({message:'Something terrible happened',status:err});
});

export default app;
