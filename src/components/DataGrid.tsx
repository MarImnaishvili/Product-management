import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface DataGridProps<T> {
  fetchUrl: string;
  columnDefs: ColDef<T>[];
}

//<T> is a TypeScript generic type parameter used to define a flexible type for the DataGrid component

const DataGrid = <T,>({ fetchUrl, columnDefs }: DataGridProps<T>) => {
  const [rowData, setRowData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(fetchUrl);
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
  }, [fetchUrl]);

  return (
    <div className="ag-theme-quartz" style={{ height: "100vh", width: "100%" }}>
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
      />
    </div>
  );
};

export default DataGrid;
