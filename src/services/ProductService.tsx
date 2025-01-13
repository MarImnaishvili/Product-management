/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { logger } from "react-native-logs";
import { Product } from "../types";

const API_BASE_URL = "http://108.17.127.80:8080/";

//  products/updateProductByProductCode

const log = logger.createLogger();

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    const response: AxiosResponse<Product[]> = await axios.get(
      `${API_BASE_URL}products/getAllProducts`
    );
    return response.data;
  }

  // Filter products based on productLine
  static getProductsByProductCategory(
    products: Product[],
    query: string
  ): Product[] {
    log.info("start fetching products by productCategory...");

    const result = products.filter((product) => {
      if (query === "") return true;
      const isProductCategoryMatch =
        product.productCategory.toLowerCase() === query.toLowerCase();

      return isProductCategoryMatch;
    });
    log.info(
      `products fechted sucessfully with + ${result.length} products.${[
        ...new Set(result.map((product) => product.productCategory)),
      ]}`
    );
    return result;
  }

  static async updateProduct(updatedData: Partial<Product>): Promise<Product> {
    try {
      const response: AxiosResponse<Product> = await axios.put(
        `${API_BASE_URL}products/updateProductByProductCode`,
        updatedData
      );
      log.info("Product updated successfully:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Log the error response data if it exists
        log.error("Error updating product:", error.response.data);
      } else {
        // Log a generic error message
        log.error("Unexpected error:", error);
      }
      throw error; // Re-throw the error after logging
    }
  }

  static async addNewProduct(newProduct: Product): Promise<Product> {
    try {
      log.info("Sending request to add product:", newProduct);
      const response: AxiosResponse<Product> = await axios.post(
        `${API_BASE_URL}products/addProduct`,
        newProduct
      );
      log.info("Product added successfully:", response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        // Check for server validation errors
        if (error.response.data.status === "ProductCodeExist") {
          throw {
            type: "ProductCodeExist",
            details: error.response.data.errorDetails, // Server sends validation error details
          };
        }
        if (error.response.data.status === "ProductPriceInValid") {
          throw {
            type: "ProductPriceInValid",
            details: error.response.data.errorDetails, // Server sends validation error details
          };
        }
        log.error("Error adding product:", error.response.data.status);
      } else {
        log.error("Unexpected error:", error);
      }
      throw error; // Re-throw the error to the caller
    }
  }
}
