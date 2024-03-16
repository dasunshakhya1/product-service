import { getAllProductDB } from "../repository/product-repository";

export const getAllProducts = () => {
  return getAllProductDB();
};
