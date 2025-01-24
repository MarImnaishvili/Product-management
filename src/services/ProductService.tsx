/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { logger } from "react-native-logs";
import { IcategoryInProduct, Product } from "../types";

const API_BASE_URL = "http://108.17.127.80:8080/";

const log = logger.createLogger();

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 1000, // 10 seconds
// });

const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    const status = error.response.data?.status;
    const errorDetails =
      error.response.data?.errorDetails || "No details provided";

    // Check for server validation errors
    if (status === "ProductCodeExist") {
      throw {
        type: "ProductCodeExist",
        details: errorDetails, // Server sends validation error details
      };
    }
    if (status === "ProductPriceInValid") {
      throw {
        type: "ProductPriceInValid",
        details: errorDetails, // Server sends validation error details
      };
    }
    log.error("Error adding product:", error.response.data.status);
  } else {
    log.error(`Unhandled server status: ${status}`);
    throw {
      type: "ServerError",
      details: `Unhandled error status: ${status}`,
    };
  }

  throw error; // Re-throw the error to the caller
};

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    const response: AxiosResponse<Product[]> = await axios.get(
      `${API_BASE_URL}products/getAllProducts`
    );
    console.log("response.data", response.data);

    return response.data;
  }

  static async getAllProductCategories(): Promise<string[]> {
    const response: AxiosResponse<IcategoryInProduct[]> = await axios.get(
      `${API_BASE_URL}product_categories/getAllProductCategories`
    );

    // Extract unique category names
    const categories = [
      ...new Set(response.data.map((category) => category.name)),
    ];

    console.log(categories); // For debugging
    return categories;
  }

  // Filter products based on productLine
  static getProductsByProductCategory(
    products: Product[],
    query: string
  ): Product[] {
    console.log(query);
    console.log(products);
    const filteredCategories = products.filter(
      (product) =>
        Array.isArray(product.productCategories) &&
        product.productCategories.some((category) => category.name === query)
    );
    console.log(products);
    return filteredCategories;
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
      handleAxiosError(error); // This function throws an error, so no further code is needed here
      throw error; // Explicitly rethrow to satisfy TypeScript
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
      handleAxiosError(error); // This function throws an error, so no further code is needed here
      throw error; // Explicitly rethrow to satisfy TypeScript
    }
  }
}
