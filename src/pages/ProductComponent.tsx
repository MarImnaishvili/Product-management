import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ColDef } from "ag-grid-community";
import DataGrid from "../components/DataGrid";
import { Product, ProductService } from "../services/ProductService";

const ProductComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const productLineFromUrl = location.pathname.split("/")[2];
  const normalizedUrl = productLineFromUrl?.trim().replace(/-/g, " ");

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
  const filteredData = ProductService.getProductsByProductLine(
    products,
    normalizedUrl || ""
  );

  const columnDefs: ColDef<Product>[] = [
    { field: "productId" },
    { field: "productCode" },
    { field: "productName" },
    { field: "productLine" },
    { field: "productScale" },
    { field: "productVendor" },
    { field: "productDescription" },
    { field: "quantityInStock" },
    { field: "buyPrice" },
    { field: "MSRP" },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: "100vh", width: "100%" }}
    >
      <DataGrid
        columnDefs={columnDefs}
        filteredData={filteredData}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ProductComponent;
