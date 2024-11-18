import React, { useEffect, useState } from "react";
import { Product, ProductService } from "../services/ProductService";
import { useLocation } from "react-router-dom";
import DataGridCopy from "../components/DataGridCopy";
import { ColDef } from "ag-grid-community";

const ProductComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const productLineFromUrl = location.pathname.split("/")[2];
  const normalizedUrl = productLineFromUrl?.trim().replace(/-/g, " ");

  console.log(productLineFromUrl);
  console.log(normalizedUrl);

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
  const filteredData = ProductService.filterProducts(
    products,
    normalizedUrl || ""
  );

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

export default ProductComponent;
