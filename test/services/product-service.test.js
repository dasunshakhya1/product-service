import { describe, it, jest, beforeEach, expect } from "@jest/globals";
import * as productRepo from "../../src/repository/product-repository.js";
import * as productService from "../../src/service/product-service.js";
import { getAllProducts } from "../../src/service/product-service";
import app from "../../src/utils/app.js";
import supertest from "supertest";

const products = { id: 1124, name: "Mars 45g chocolates" };
describe("Verify product service", () => {
  it("Verify getAllProduct should return an array of products", async () => {
    jest.spyOn(productRepo, "getAllProductDB").mockReturnValueOnce(products);

    const results = await getAllProducts();

    expect(productRepo.getAllProductDB).toHaveBeenCalledTimes(1);
    expect(results).toEqual(products);
  });

  it("Verify getProductById should return 404 when product is not found by productId", async () => {
    jest.spyOn(productRepo, "getProductByIdDB").mockReturnValueOnce({
      message: `Product with 123 not found`,
      status: "Not Found",
    });

    const results = await productService.getProductById(123);
    expect(results).toEqual({
      message: `Product with 123 not found`,
      status: "Not Found",
    });
  });
});
