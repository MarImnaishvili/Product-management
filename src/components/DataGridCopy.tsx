import { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Product, Post } from "../services/ProductService";

interface DataGridProps<T> {
  columnDefs: ColDef<T>[];
  filteredData: T[]; // Corrected to T[] (generic type)
  error: string | null;
  loading: boolean;
}

const DataGridCopy = <T extends Product | Post>({
  columnDefs,
  filteredData,
  error,
  loading,
}: DataGridProps<T>) => {
  const [rowData, setRowData] = useState<T[]>([]);

  useEffect(() => {
    setRowData(filteredData);
  }, [filteredData]); // only run when filteredData changes

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

export default DataGridCopy;
