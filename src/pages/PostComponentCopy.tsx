import React, { useEffect, useState } from "react";
import { Post, ProductService } from "../services/ProductService";
import { useLocation } from "react-router-dom";
import DataGridCopy from "../components/DataGridCopy";
import { ColDef } from "ag-grid-community";

const PostComponent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();

  // Determine if we're on the /posts path
  const isPostsPage = location.pathname === "/posts";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await ProductService.getAllPosts();
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (err) {
        setError(
          `Error fetching posts: ${err instanceof Error ? err.message : err}`
        );
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // If it's not the /posts page, normalize the URL for filtering (assuming that the pathname may contain a query string or slug)
  const normalizedUrl = !isPostsPage
    ? location.pathname.split("/")[2]?.trim().replace(/-/g, " ")
    : ""; // No need to normalize if we are on the /posts page

  // Filter posts using ProductService only if we're not on the /posts page
  const filteredData = isPostsPage
    ? posts
    : ProductService.filterPosts(posts, normalizedUrl);

  const columnDefs: ColDef<Post>[] = [
    { field: "id" },
    { field: "title" },
    { field: "views" },
    { field: "active" },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: "100vh", width: "100%" }}
    >
      <DataGridCopy
        columnDefs={columnDefs}
        filteredData={filteredData}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default PostComponent;
