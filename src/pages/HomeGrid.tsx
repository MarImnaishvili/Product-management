import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const HomeGrid: React.FC = () => {
  // Define empty column definitions
  const columnDefs: ColDef[] = []; // Explicitly typed as an empty array of ColDef
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowData: any[] = []; // No data, you can use any type here

  return (
    <div className="ag-theme-quartz" style={{ height: "100vh", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={false} // Disable pagination
        domLayout="autoHeight" // Optional: adjust height based on content
        //sortable={false} // Disable sorting
        //filter={false} // Disable filtering
        //editable={false} // Disable editing
        //enableColResize={false} // Disable column resizing
        //enableRangeSelection={false} // Disable range selection
      />
    </div>
  );
};

export default HomeGrid;
