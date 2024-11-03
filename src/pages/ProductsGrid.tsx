import React from "react";
import { ColDef } from "ag-grid-community";
import DataGrid from "../components/DataGrid";

interface Product {
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

const ProductsGrid: React.FC = () => {
  const columnDefs: ColDef<Product>[] = [
    { field: "productCode" },
    { field: "productName" },
    { field: "productLine" },
    { field: "productScale" },
    { field: "productVendor" },
    { field: "productDescription" },
    { field: "quantityInStock" },
    { field: "buyPrice" },
    { field: "MSRP" },
    { field: "id" },
  ];

  return (
    <DataGrid<Product>
      fetchUrl="http://localhost:3001/products"
      columnDefs={columnDefs}
    />
  );
};

export default ProductsGrid;
