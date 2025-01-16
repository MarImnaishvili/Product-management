import { GridApi, IRowNode } from "ag-grid-community";

//GridApi: Represents the API provided by AG-Grid to manipulate and interact with the grid.
//IRowNode: Represents a single row within AG-Grid. Each row in the grid is an IRowNode object

//<T>: This defines a generic type parameter T. It represents a placeholder for any type that will be provided when the function is used.
//The syntax <T extends { id: string }> tells TypeScript: T can be any type, but it must have a property called id that is a string.
//Partial<T> ნიშნავს რომ ყველა ელემენტი optional არის,  &  აერთიანებს ტიპებს, { id: string } არის უკვე required

export const updateGridRowData = <T extends { id: number }>(
  gridApi: GridApi | null,
  updatedData: Partial<T> & { id: number }
) => {
  if (!gridApi) {
    console.error("Grid API is not available.");
    return;
  }

  gridApi.forEachNode((rowNode: IRowNode<T>) => {
    if (rowNode.data?.id === updatedData.id) {
      rowNode.setData({ ...rowNode.data, ...updatedData });
    }
  });
};
