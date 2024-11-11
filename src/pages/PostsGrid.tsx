import React from "react";
import { ColDef } from "ag-grid-community";
import DataGrid from "../components/DataGrid";

interface Post {
  id: string;
  title: string;
  views: number;
  active: boolean;
}

const PostsGrid: React.FC = () => {
  const columnDefs: ColDef<Post>[] = [
    { field: "id" },
    { field: "title" },
    { field: "views" },
    { field: "active" },
  ];

  return (
    <DataGrid<Post>
      fetchUrl="http://localhost:3001/posts"
      columnDefs={columnDefs}
    />
  );
};

export default PostsGrid;
