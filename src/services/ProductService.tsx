import axios, { AxiosResponse } from "axios";

export interface Product {
  productCode: string;
  productName: string;
  productLine: string;
  productScale: string;
  productVendor: string;
  productDescription: string;
  quantityInStock: number;
  buyPrice: number;
  MSRP: number;
  id: string;
}

export interface Post {
  id: string;
  title: string;
  views: number;
  active: boolean;
}

const API_BASE_URL = "http://localhost:3001/";

export class ProductService {
  // Fetch all products
  static async getAllProducts(): Promise<Product[]> {
    const response: AxiosResponse<Product[]> = await axios.get(
      `${API_BASE_URL}products/`
    );
    return response.data;
  }

  // Fetch all posts
  static async getAllPosts(): Promise<Post[]> {
    const response: AxiosResponse<Post[]> = await axios.get(
      `${API_BASE_URL}posts/`
    );
    return response.data;
  }

  // Fetch a product by its ID
  //   static async getProductById(id: number): Promise<Product> {
  //     const response: AxiosResponse<Product> = await axios.get(
  //       `${API_BASE_URL}products/${id}`
  //     );
  //     return response.data;
  //   }

  // Filter products based on productLine and name (or other properties)
  static filterProducts(products: Product[], query: string): Product[] {
    return products.filter((product) => {
      if (query === "") return true;
      const isProductLineMatch =
        product.productLine.toLowerCase() === query.toLowerCase();

      //   if (index === 1) {
      //     console.log(product.productLine.toLowerCase());
      //   }
      //   console.log(query.toLowerCase());
      return isProductLineMatch;
    });
  }

  // Filter posts based on the active status or title
  static filterPosts(posts: Post[], query: string): Post[] {
    return posts.filter((post) => {
      // If the query is empty, return all posts
      if (query === "") return true;

      // Check for the 'active' status match based on query
      const isActiveMatch =
        query?.toLowerCase() === "active"
          ? post.active === true
          : post.active === false;

      return isActiveMatch;
    });
  }
}
