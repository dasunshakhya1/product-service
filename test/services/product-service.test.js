import { describe, it, jest, beforeEach, expect } from "@jest/globals";
import * as productRepo from "../../src/repository/product-repository.js";
import { getAllProducts } from "../../src/service/product-service";

describe("Verify product service", () => {
  it("Verify getAllProduct should return an array of products", async () => {
    const products = { id: 1124, name: "Mars 45g chocolates" };

      jest.spyOn(productRepo, "getAllProductDB").mockReturnValueOnce(products);
      
      const results = await getAllProducts()

      expect(productRepo.getAllProductDB).toHaveBeenCalledTimes(1)
      expect(results).toEqual(products)
  });
});
