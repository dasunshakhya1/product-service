import { describe, jest } from "@jest/globals";
import * as stockService from "../../src/services/stock-service.js";
import * as stockRepo from "../../src/repositories/stock-repository.js";
import * as productRepo from "../../src/repositories/product-repository.js";

const stock = {
  product_id: "MARS_12G",
  measure_unit: "g",
  min_volume: 20,
  max_volume: 1000,
  reorder_threshold: 100,
  current_volume: 600,
};

describe("Verify stock service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("Verify /stock POST route.  Should get success response when creating not existing stock", async () => {
    const res = {
      isCreated: true,
      isProductFound: true,
      isNewStock: true,
      stock: {
        product_id: "MARS_12G",
        measure_unit: "g",
        min_volume: 20,
        max_volume: 1000,
        reorder_threshold: 100,
        current_volume: 600,
      },
      message: "Stock Crated!!!",
    };

    jest
      .spyOn(productRepo, "getProductByIdDB")
      .mockReturnValueOnce({ isFound: true });
    jest
      .spyOn(stockRepo, "getStockByProductIdDB")
      .mockReturnValueOnce({ isFound: false });
    jest.spyOn(stockRepo, "createStockDB").mockReturnValueOnce(res);
    jest.spyOn(stockRepo, "getStockByProductIdDB").mockReturnValueOnce({
      data: {
        product_id: "MARS_12G",
        measure_unit: "g",
        min_volume: 20,
        max_volume: 1000,
        reorder_threshold: 100,
        current_volume: 600,
      },
    });

    const result = await stockService._addStock(stock);

    expect(productRepo.getProductByIdDB).toHaveBeenCalledTimes(1);
    expect(stockRepo.getStockByProductIdDB).toHaveBeenCalledTimes(2);
    expect(stockRepo.createStockDB).toHaveBeenCalledTimes(1);
    expect(result).toEqual(res);
  });

  it("Verify /stock POST route.  Should get not success response when creating an existing stock", async () => {
    const res = {
      isNewStock: false,
      isProductFound: true,
      isCreated: false,
      stock: {},
      message: `Stock with product id MARS_12G is already exist`,
    };

    jest
      .spyOn(productRepo, "getProductByIdDB")
      .mockReturnValueOnce({ isFound: true });
    jest
      .spyOn(stockRepo, "getStockByProductIdDB")
      .mockReturnValueOnce({ isFound: true });

    const result = await stockService._addStock(stock);

    expect(productRepo.getProductByIdDB).toHaveBeenCalledTimes(1);
    expect(stockRepo.getStockByProductIdDB).toHaveBeenCalledTimes(1);
    expect(result).toEqual(res);
  });

  it("Verify /stock POST route.  Should get not success response when creating a stock for non existing product", async () => {
    const res = {
      isNewStock: false,
      isProductFound: false,
      isCreated: false,
      stock: {},
      message: `Product with id MARS_12G not found`,
    };

    jest
      .spyOn(productRepo, "getProductByIdDB")
      .mockReturnValueOnce({ isFound: false });

    const result = await stockService._addStock(stock);

    expect(productRepo.getProductByIdDB).toHaveBeenCalledTimes(1);
    expect(result).toEqual(res);
  });
});
