import React, { memo, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { PostService } from "../services/PostService";
import DataGrid from "../components/DataGrid";
import { GridOptionsType, Post } from "../types";
import { PropsActionComponent } from "../components/PropsActionComponent";
import { GridApi, IRowNode } from "ag-grid-community";

//may be exported
const updateGridRowData = <T extends { id: string }>(
  gridApi: GridApi | null,
  updatedData: Partial<T> & { id: string }
) => {
  if (!gridApi) {
    console.error("Grid API is not available.");
    return;
  }

  gridApi.forEachNode((rowNode: IRowNode<T>) => {
    if (rowNode.data?.id === updatedData.id) {
      rowNode.setData({ ...rowNode.data, ...updatedData });
    }
  });
};

const PostComponent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const handleSavePost = (updatedPost: Post) => {
    if (!updatedPost.id) {
      console.error("Attempting to save a post without an ID:", updatedPost);
      return;
    }
    updateGridRowData(gridApi, updatedPost);
  };
  const handleGridReady = (api: GridApi) => {
    setGridApi(api);
  };
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
  const filteredData = useMemo(() => {
    return isPostsPage
      ? posts
      : PostService.getPostsByStatus(posts, normalizedUrl);
  }, [isPostsPage, posts, normalizedUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const columnDefs: ColDef<Post>[] = [
    { field: "id", filter: "agTextColumnFilter", flex: 0.5 },
    {
      field: "action",
      cellRenderer: memo((params: ICellRendererParams<Post>) =>
        params.data ? (
          <PropsActionComponent
            data={
              params.data || {
                id: "",
                title: "",
                views: 0,
                active: false,
                date: "",
              }
            }
            onSave={handleSavePost}
          />
        ) : null
      ),
      flex: 1.2,
    },
    { field: "title", filter: "agTextColumnFilter", flex: 1.2 },
    { field: "views", filter: "agNumberColumnFilter" },
    {
      field: "active",
    },
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: (dateFromFilter: number, cellValue: string | null) => {
          if (cellValue == null) {
            return 0;
          }
          const dateParts = cellValue.split("/");
          const month = Number(dateParts[0]);
          const day = Number(dateParts[1]);
          const year = Number(dateParts[2]);
          const cellDate: Date = new Date(year, month - 1, day); // Adjust for 0-based month

          const cellDateTimestamp = cellDate.getTime(); // Convert cellDate to timestamp (number)

          if (cellDateTimestamp < dateFromFilter) {
            return -1;
          } else if (cellDateTimestamp > dateFromFilter) {
            return 1;
          }
          return 0;
        },
      },
    },
  ];
  // Define GridOptions for DataGrid
  const productGridOptions: GridOptionsType<Post> = {
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
    <div className="ag-theme-quartz-dark, viewPortHeight">
      <DataGrid
        key={JSON.stringify(posts)}
        gridOptions={productGridOptions}
        onGridReady={handleGridReady}
      />
      {/* {posts.map((post) => (
        <PropsActionComponent
          key={post.id}
          data={post}
          onSave={handleSavePost} // Pass this function correctly
        />
      ))} */}
    </div>
  );
};

export default PostComponent;
