import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ColDef } from "ag-grid-community";
import { PostService } from "../services/PostService";
import DataGrid from "../components/DataGrid";
import { GridOptions, Post } from "../types";

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
        const fetchedPosts = await PostService.getAllPosts();
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
    : PostService.filterPosts(posts, normalizedUrl);

  // Define columnDefs for the AG-Grid
  const columnDefs: ColDef<Post>[] = [
    { field: "id" },
    { field: "title" },
    { field: "views" },
    { field: "active" },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Define GridOptions for DataGrid
  const productGridOptions: GridOptions<Post> = {
    columnDefs,
    filteredData,
    error,
    loading,
    rowHeight: 45, // Customize row height
    gridWidth: "100%", // Customize grid width
    pagination: true, // Enable pagination
    paginationPageSize: 15, // Custom page size for Products
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true, // Allow resizing columns
    },
    paginationPageSizeSelector: [15, 30, 60, 120], // Pagination options
    headerHeight: 40, // Customize header height
  };

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: "100vh", width: "100%" }}
    >
      <DataGrid gridOptions={productGridOptions} />
    </div>
  );
};

export default PostComponent;
