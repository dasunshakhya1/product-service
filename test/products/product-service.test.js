import { describe, it, jest, beforeEach, expect } from "@jest/globals";
import * as productRepo from "../../src/repositories/product-repository.js";
import * as productService from "../../src/services/product-service.js";

import app from "../../src/utils/app.js";
import supertest from "supertest";

const products = [
  {
    product_id: 1,
    price: 2.2,
    name: "Mars 45g Chocolate",
  },
  {
    product_id: 2,
    price: 2.75,
    name: "Snickers 45g Chocalate",
  },
];
describe("Verify product service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("Verify getAllProduct should return an array of products", async () => {
    jest.spyOn(productRepo, "getAllProductDB").mockReturnValueOnce(products);

    const results = await productService._getAllProducts();
    expect(productRepo.getAllProductDB).toHaveBeenCalledTimes(1);
    expect(results).toEqual(products);
  });

  it("Verify getProductById should return a product when it is found by productId", async () => {
    jest
      .spyOn(productRepo, "getProductByIdDB")
      .mockReturnValueOnce([products[0]]);

    const results = await productService._getProductById(1);
    expect(productRepo.getProductByIdDB).toHaveBeenCalledTimes(1);
    expect(results).toEqual(products[0]);
  });

  it("Verify getProductById should return 404 when product is not found by productId", async () => {
    jest.spyOn(productRepo, "getProductByIdDB").mockReturnValueOnce([]);

    const results = await productService._getProductById(12);
    expect(productRepo.getProductByIdDB).toHaveBeenCalledTimes(1);
    expect(results).toEqual({});
  });
});
