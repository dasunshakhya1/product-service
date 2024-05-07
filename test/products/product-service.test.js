import { describe, it, jest, beforeEach, expect } from "@jest/globals";
import * as productRepo from "../../src/repositories/product-repository.js";
import * as productService from "../../src/services/product-service.js";

const products = [
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

  it("Verify /product POST route. Should get success response when creating not existing product", async () => {
    jest
      .spyOn(productRepo, "getProductByIdDB")
      .mockReturnValueOnce({ isFound: false, data: {} });
    jest
      .spyOn(productRepo, "createProductDB")
      .mockReturnValueOnce({ isFound: true });

    const results = await productService._createProduct({
      id: "MARS_12G",
      name: "Mars 12g Chocolate",
      measureUnit: "g",
      volume: 12,
    });

    expect(productRepo.getProductByIdDB).toHaveBeenCalledTimes(1);
    expect(productRepo.createProductDB).toHaveBeenCalledTimes(1);
    expect(results).toEqual({
      isCreated: true,
      products: {
        id: "MARS_12G",
        name: "Mars 12g Chocolate",
        measureUnit: "g",
        volume: 12,
      },
    });
  });

  it("Verify /product POST route. Should not get success response when creating an existing product", async () => {
    jest
      .spyOn(productRepo, "getProductByIdDB")
      .mockReturnValueOnce({ isFound: true, data: products[0] });

    jest
      .spyOn(productRepo, "createProductDB")
      .mockReturnValueOnce({ isFound: false });

    const results = await productService._createProduct({
      id: "MARS_12G",
      name: "Mars 12g Chocolate",
      measureUnit: "g",
      volume: 12,
    });

    expect(productRepo.getProductByIdDB).toHaveBeenCalledTimes(1);
    expect(productRepo.createProductDB).toHaveBeenCalledTimes(0);
    expect(results).toEqual({
      isCreated: false,
      products: products[0],
    });
  });

  it("Verify /product/name POST route.Should get success response with data", async () => {
    jest
      .spyOn(productRepo, "getProductByNameDB")
      .mockReturnValueOnce({ isFound: true, data: products[0] });

    const results = await productService._getProductByName({
      name: "Mars 12g Chocolate",
    });

    expect(productRepo.getProductByNameDB).toHaveBeenCalledTimes(1);
    expect(results).toEqual({
      isFound: true,
      products: products[0],
    });
  });

  it("Verify /product/name POST route.Should not get success response with data", async () => {
    jest
      .spyOn(productRepo, "getProductByNameDB")
      .mockReturnValueOnce({ isFound: false, data: {} });

    const results = await productService._getProductByName({
      name: "Mars 12g Chocolate",
    });

    expect(productRepo.getProductByNameDB).toHaveBeenCalledTimes(1);
    expect(results).toEqual({
      isFound: false,
      products: {},
    });
  });

  it("Verify /product/{product_Id} GET route.Should get success response with data", async () => {
    jest
      .spyOn(productRepo, "getProductByIdDB")
      .mockReturnValueOnce({ isFound: true, data: products[0] });

    const results = await productService._getProductById({
      name: "MARS_12G",
    });

    expect(productRepo.getProductByIdDB).toHaveBeenCalledTimes(1);
    expect(results).toEqual({
      isFound: true,
      products: products[0],
    });
  });

  it("Verify /product/{product_Id} GET route.Should not get success response with data", async () => {
    jest
      .spyOn(productRepo, "getProductByIdDB")
      .mockReturnValueOnce({ isFound: false, data: {} });

    const results = await productService._getProductById({
      name: "MARS_12G",
    });

    expect(productRepo.getProductByIdDB).toHaveBeenCalledTimes(1);
    expect(results).toEqual({
      isFound: false,
      products: {},
    });
  });

  it("Verify /product GET route.Should get success response with data", async () => {
    jest
      .spyOn(productRepo, "getAllProductDB")
      .mockReturnValueOnce({ isFound: true, data: products });

    const results = await productService._getAllProducts();

    expect(productRepo.getAllProductDB).toHaveBeenCalledTimes(1);
    expect(results).toEqual({
      isFound: true,
      products: products,
    });
  });
});
