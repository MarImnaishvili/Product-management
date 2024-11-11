import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useLocation } from "react-router-dom";

interface DataGridProps<T> {
  fetchUrl: string;
  columnDefs: ColDef<T>[];
}

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
interface Post {
  id: string;
  title: string;
  views: number;
  active: boolean;
}
const DataGrid = <T extends Product | Post>({
  fetchUrl,
  columnDefs,
}: DataGridProps<T>) => {
  const [rowData, setRowData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const productLineFromUrl = location.pathname.split("/")[2];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: T[] = await response.json();

        const normalizedUrl = productLineFromUrl?.trim().replace(/-/g, " ");

        const filteredData = productLineFromUrl
          ? data.filter((item) => {
              if ("productLine" in item && (item as Product).productLine) {
                return (
                  (item as Product).productLine.trim().toLowerCase() ===
                  normalizedUrl
                );
              }
              if ("views" in item) {
                return normalizedUrl === "active"
                  ? (item as Post).active === true
                  : (item as Post).active === false;
              }

              return false;
            })
          : data;

        console.log("Filtered Data:", filteredData);

        setRowData(filteredData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fetchUrl, productLineFromUrl]);

  // Default column definitions for ag-Grid
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
    }),
    []
  );

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: "100vh", width: "100%" }}
    >
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error}</p>}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={15}
        domLayout="autoHeight"
        paginationPageSizeSelector={[15, 30, 60, 120]}
        headerHeight={40}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default DataGrid;
