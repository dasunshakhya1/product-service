import { executeQuery } from "../utils/db";

export const getAllProductDB = () => {
  const query = "SELECT * FROM shoppa.products";
  return executeQuery(query);
};
