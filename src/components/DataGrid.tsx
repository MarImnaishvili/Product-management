import { useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { DataGridProps } from "../types";

const DataGrid = <T,>({ gridOptions }: DataGridProps<T>) => {
  const {
    columnDefs,
    filteredData,
    error,
    loading,
    rowHeight = 40,
    gridWidth = "100%",
    pagination = true,
    paginationPageSize = 15,
    defaultColDef = { sortable: true, filter: true },
    paginationPageSizeSelector = [15, 30, 60, 120],
    headerHeight = 40,
  } = gridOptions;

  // Memoized default column definitions, overriding as necessary
  const memoizedColDef = useMemo(
    () => ({
      ...defaultColDef,
      flex: 1, // This will ensure columns take up available space
    }),
    [defaultColDef]
  );

  useEffect(() => {
    // No need to manage rowData state manually since it is already passed in gridOptions.
    // AG-Grid will handle this for you via the 'filteredData' prop.
  }, [filteredData]);

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: "100vh", width: gridWidth }}
    >
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error}</p>}
      <AgGridReact
        columnDefs={columnDefs}
        rowData={filteredData} // Directly pass filteredData as rowData
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        headerHeight={headerHeight}
        rowHeight={rowHeight}
        defaultColDef={memoizedColDef} // Use memoized default column definition
      />
    </div>
  );
};

export default DataGrid;
