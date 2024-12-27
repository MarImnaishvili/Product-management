import axios, { AxiosResponse } from "axios";
import { logger } from "react-native-logs";
import { Product } from "../types";

const API_BASE_URL = "http://108.17.127.80:8080/";

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
}
