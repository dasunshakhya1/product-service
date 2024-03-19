import { executeQuery } from "../utils/db";

export const getAllProductDB = () => {
  const query = "SELECT * FROM supermart.products";
  return executeQuery(query);
};

export const getProductByIdDB = (productId) => {
  const query = `SELECT * FROM supermart.products where product_id=${productId}`;

  console.log(query);
  return executeQuery(query);
};

export const createProductDB = ({  name, price }) => {
  const query = `INSERT INTO supermart.products(name,price) values('${name}',${price})`
 return executeQuery(query)
};

export const getProductByNameDB = (productName) => {
  const query = `SELECT *  FROM supermart.products WHERE name='${productName}'`
  
  return executeQuery(query)
  
}
