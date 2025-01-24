/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ColDef, GridApi, ICellRendererParams } from "ag-grid-community";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DataGrid from "../components/DataGrid";
import { ProductService } from "../services/ProductService";
import {
  GridOptionsType,
  IcategoryInProduct,
  Product,
  ProductUpdated,
} from "../types";
import { PropsActionComponent } from "../components/PropsActionComponent";
import { updateGridRowData } from "../gridUtils";
import { ProductModal } from "../components/ProductModal";

const ProductComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{
    message: string;
    httpCode: number;
  } | null>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [openNewModal, setOpenNewModal] = useState<boolean>(false);
  const location = useLocation();

  const productLineFromUrl = location.pathname.split("/")[2];
  const normalizedUrl = productLineFromUrl?.trim().replace(/-/g, " ");

  // Handle product updates using PropsActionComponent
  const handleUpdateProduct = useCallback(
    async (
      gridApi: GridApi | null,
      updatedProduct?: Partial<ProductUpdated> & {
        productCode: string;
      }
    ) => {
      if (!updatedProduct) {
        console.error("No product data provided.");
        return;
      }

      try {
        const updatedData = await ProductService.updateProduct(updatedProduct);
        updateGridRowData(gridApi, updatedData);
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    },
    []
  );

  const handleAddProduct = async (
    gridApi: GridApi | null,
    newProduct: Product
  ) => {
    try {
      const addedProduct = await ProductService.addNewProduct(newProduct);
      if (gridApi) {
        gridApi.applyTransaction({ add: [addedProduct] });
      }
    } catch (error: any) {
      console.error("Failed to add product:", error);
      setError({
        message: error?.response?.data?.errorDetails || "Error adding product",
        httpCode: error?.response?.status || 500,
      });
      throw error;
    }
  };

  const handleGridReady = useCallback((api: GridApi) => setGridApi(api), []);

  const columnDefs: ColDef<Product, any>[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 100,
        suppressMovable: true,
        valueGetter: (params) => params.data?.id ?? "N/A",
      },
      {
        field: "action",
        cellRenderer: (params: ICellRendererParams<ProductUpdated>) => {
          if (!params.data) return null;
          return (
            <PropsActionComponent
              data={params.data}
              onSave={(updatedData: ProductUpdated) =>
                handleUpdateProduct(gridApi, updatedData)
              }
            />
          );
        },
        flex: 1.5,
      },
      { field: "productCode" },
      { field: "productName" },
      {
        field: "productCategories",
        headerName: "Categories",
        cellRenderer: (params: ICellRendererParams) => {
          if (!params.data || !params.data.productCategories) return null;
          const categoryNames = params.data.productCategories.map(
            (category: IcategoryInProduct) => category.name
          );
          return categoryNames.join(", ");
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
    ],
    [gridApi, handleUpdateProduct]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await ProductService.getAllProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error: any) {
        setError({
          message:
            error?.response?.data?.errorDetails || "Error fetching products",
          httpCode: error?.response?.status || 500,
        });
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update filteredData based on products and normalizedUrl
  useEffect(() => {
    console.log("Normalized URL:", normalizedUrl);

    let filtered = products;

    if (normalizedUrl) {
      // If there's a category in the URL, filter products based on the category
      filtered = products.filter(
        (product) =>
          Array.isArray(product.productCategories) &&
          product.productCategories.some(
            (category) =>
              category.name.toLowerCase() === normalizedUrl.toLowerCase()
          )
      );
    }

    // If no category in the URL, show all products
    console.log("Filtered Data:", filtered);
    setFilteredData(filtered);
  }, [products, normalizedUrl]);

  if (loading) return <div>Loading...</div>;

  const productGridOptions: GridOptionsType<Product> = {
    columnDefs,
    rowData: filteredData,
    filteredData,
    error: error ? error.message : null,
    loading,
    rowHeight: 45,
    gridWidth: "100%",
    pagination: true,
    paginationPageSize: 15,
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
    paginationPageSizeSelector: [15, 30, 60, 120],
    headerHeight: 40,
  };

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: "100vh", width: "100%" }}
    >
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenNewModal(true)}
        sx={{
          marginBottom: 2,
          borderRadius: 1,
          backgroundColor: "gray",
          "&:hover": {
            backgroundColor: "darkgray",
          },
        }}
      >
        Add New Product
      </Button>

      <DataGrid
        key={JSON.stringify(products)}
        gridOptions={productGridOptions}
        onGridReady={handleGridReady}
      />
      {openNewModal && (
        <ProductModal
          open={openNewModal}
          onClose={() => setOpenNewModal(false)}
          onSave={(newProduct: Product) =>
            handleAddProduct(gridApi, newProduct)
          }
          rowData={{
            id: undefined,
            productCode: "",
            productName: "",
            productCategories: [],
            productVendor: "",
            productDescription: "",
            productQtyInStock: 0,
            productPrice: 0,
            msrp: 0,
            isAvailable: false,
          }}
          mode={"New"}
        />
      )}
    </div>
  );
};

export default ProductComponent;
