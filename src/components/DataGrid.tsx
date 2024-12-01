import { useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { DataGridProps } from "../types";

const DataGrid = <T,>({ gridOptions, onGridReady }: DataGridProps<T>) => {
  const {
    columnDefs,
    filteredData,
    error,
    loading,
    rowHeight = 40,
    gridWidth = "100%",
    pagination = true,
    paginationPageSize = 15,
    paginationPageSizeSelector = [15, 30, 60, 120],
    headerHeight = 40,
    defaultColDef, // Now it's explicitly passed as a prop
  } = gridOptions;

  const gridRef = useRef<AgGridReact>(null);

  useEffect(() => {
    if (onGridReady && gridRef.current) {
      onGridReady(gridRef.current.api);
    }
  }, [onGridReady]);
  // Memoized default column definitions, overriding as necessary
  const memoizedColDef = useMemo(
    () => ({
      ...defaultColDef,
      flex: 1,
      sortable: true,
      filter: true,
      //editable: true,
    }),
    [defaultColDef]
  );

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: "100vh", width: gridWidth || "100%" }}
    >
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error}</p>}
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={filteredData} // Directly pass filteredData as rowData
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        headerHeight={headerHeight}
        rowHeight={rowHeight}
        defaultColDef={memoizedColDef} // Use memoized default column definition
        rowSelection="multiple" // Correct usage for multiple row selection
      />
    </div>
  );
};

export default DataGrid;
