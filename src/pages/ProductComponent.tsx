import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ColDef } from "ag-grid-community";
import DataGrid from "../components/DataGrid";
import { ProductService } from "../services/ProductService";
import { GridOptionsType, Product } from "../types";

const columnDefs: ColDef<Product>[] = [
  { field: "id" },
  { field: "productCode" },
  { field: "productName" },
  {
    field: "productCategory",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: ["Smartphone", "Electronics"],
    },
  },
  { field: "productVendor" },
  { field: "productDescription" },
  { field: "productQtyInStock" },
  { field: "productPrice" },
  { field: "msrp" },
  { field: "isAvailable" },
  { field: "createdBy" },
  { field: "createdTimestamp" },
  { field: "updatedBy" },
  { field: "updatedTimestamp" },
];

const ProductComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const productLineFromUrl = location.pathname.split("/")[2];
  const normalizedUrl = productLineFromUrl?.trim().replace(/-/g, " ");
  console.log("location", location);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await ProductService.getAllProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        setError(
          `Error fetching products: ${err instanceof Error ? err.message : err}`
        );
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products using ProductService
  const filteredData = ProductService.getProductsByProductCategory(
    products,
    normalizedUrl || ""
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const productGridOptions: GridOptionsType<Product> = {
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

export default ProductComponent;
