import axios, { AxiosResponse } from "axios";
import { logger } from "react-native-logs";
import { Product } from "../types";

const API_BASE_URL = "http://localhost:3001/";

const log = logger.createLogger();

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    const response: AxiosResponse<Product[]> = await axios.get(
      `${API_BASE_URL}products/`
    );
    return response.data;
  }

  // Filter products based on productLine
  static getProductsByProductLine(
    products: Product[],
    query: string
  ): Product[] {
    log.info("start fetching products by productLine...");

    const result = products.filter((product) => {
      if (query === "") return true;
      const isProductLineMatch =
        product.productLine.toLowerCase() === query.toLowerCase();

      return isProductLineMatch;
    });
    log.info(
      `products fechted sucessfully with + ${result.length} products.${[
        ...new Set(result.map((product) => product.productVendor)),
      ]}`
    );
    return result;
  }
}
