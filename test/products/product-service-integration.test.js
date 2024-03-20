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

    return supertest(app).get("/products").expect({ products }).expect(200);
  });

  it("Verify 404 is returned when product is not available", () => {
    jest.spyOn(productRepo, "getProductByIdDB").mockResolvedValueOnce([]);
    return supertest(app).get("/products/20").expect(404);
  });
});
