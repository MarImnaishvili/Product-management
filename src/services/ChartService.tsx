/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { TProductChart } from "../types";

// const API_BASE_URL_JSON_SERVER = "http://localhost:8000/ProductDataForChart";
const API_BASE_URL =
  "http://108.17.127.80:8080/productDashboard/getSmallChartDetailsForAddedProducts";

export class ChartService {
  static async getProductQuantityChart(): Promise<TProductChart> {
    try {
      const response: AxiosResponse<TProductChart> = await axios.get(
        `${API_BASE_URL}`
      );
      console.log(response.data); // For debugging purposes
      return response.data;
    } catch (error: any) {
      // Improved error handling
      const errorMessage =
        error?.response?.data?.errorDetails ||
        error?.message ||
        "An error occurred while fetching the data";
      console.error(errorMessage); // Log error for debugging
      throw new Error(errorMessage); // Re-throw error after logging
    }
  }
}
