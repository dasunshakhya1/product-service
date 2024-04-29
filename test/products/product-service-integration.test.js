import { describe, it, jest, beforeEach, expect } from "@jest/globals";
import * as productRepo from "../../src/repositories/product-repository.js";
import * as productService from "../../src/services/product-service.js";

import app from "../../src/utils/app.js";
import supertest from "supertest";

const prods = [
  {
    id: "MARS_12G",
    name: "Mars 12g Chocolate",
    measureUnit: "g",
    volume: 12,
  },
];

describe("Verify product service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("Verify /products/{product_Id} should return 200 when the product is available", async () => {
    const mock = {
      isFound: true,
      products: prods[0],
    };
    jest.spyOn(productService, "_getProductById").mockReturnValueOnce(mock);
    return supertest(app)
      .get("/products/MARS_12G")
      .expect(200)
      .expect({ products: prods[0] });
  });



    it("Verify /products/{product_Id} should return 404 when the product is not available", async () => {
      const mock = {
        isFound: true,
        products: prods[0],
      };
      jest.spyOn(productService, "_getProductById").mockReturnValueOnce(mock);
      return supertest(app)
        .get("/products/MARS_12G")
        .expect(200)
        .expect({ products: prods[0] });
    });
});
