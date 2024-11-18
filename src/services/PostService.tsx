import axios, { AxiosResponse } from "axios";
// import { logger } from "react-native-logs";

export interface Post {
  id: string;
  title: string;
  views: number;
  active: boolean;
}

const API_BASE_URL = "http://localhost:3001/";

// const log = logger.createLogger();

export class PostService {
  static async getAllPosts(): Promise<Post[]> {
    const response: AxiosResponse<Post[]> = await axios.get(
      `${API_BASE_URL}posts/`
    );
    return response.data;
  }

  // Filter posts based on the active status
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
