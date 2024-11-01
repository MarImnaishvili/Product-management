import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface RowData {
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

const AgGrid: React.FC = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<RowData[]>([]);
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<ColDef<RowData>[]>([
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
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRowData(data);
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
  }, []);

  return (
    <>
      <div
        className="ag-theme-quartz"
        style={{ height: "100vh", width: "100%" }}
      >
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching data: {error}</p>}
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={15}
          domLayout="autoHeight" // Optional: to adjust the height of the grid based on the content
          paginationPageSizeSelector={[15, 30, 60, 120]}
          headerHeight={40}
        />
      </div>
    </>
  );
};

export default AgGrid;
