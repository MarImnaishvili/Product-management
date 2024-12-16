/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColDef, GridApi } from "ag-grid-community";

export interface Post {
  id: string;
  action: any;
  title: string;
  views: number;
  active: boolean;
  date: string;
}

export interface Product {
  id: string;
  productCode: string;
  productName: string;
  productLine: string;
  productScale: string;
  productVendor: string;
  productDescription: string;
  quantityInStock: number;
  buyPrice: number;
  MSRP: number;
}

// Define GridOptions interface with generics
export interface GridOptionsType<T> {
  columnDefs: ColDef<T, any>[];
  filteredData: T[];
  error: string | null;
  loading: boolean;
  rowHeight?: number;
  gridWidth?: string;
  pagination?: boolean;
  paginationPageSize?: number;
  defaultColDef?: ColDef<T, any>;
  paginationPageSizeSelector?: number[];
  domLayout?: string;
  headerHeight?: number;
}

export interface DataGridProps<T> {
  gridOptions: GridOptionsType<T>;
  onGridReady?: (gridApi: GridApi<T>) => void; // Add this line
}

export interface IColDef {
  flex?: number;
  sortable?: boolean;
  filter?: boolean;
  editable?: boolean;
} // was not case to use

export interface PropsModalProps {
  rowData: Post | null;
  onClose: () => void;
  open: boolean;
  modalData: Post;
  setModalData: React.Dispatch<React.SetStateAction<Post>>;
  mode: "view" | "edit" | "toggleActive";
  onSave: (updatedPost: Post) => void;
}

export interface PropsActionComponentProps {
  data: Post | undefined;
  onSave: (updatedPost: Post) => void; // onSave is passed from PostComponent
}
// export type HandleSaveProps = {
//   gridApi: GridApi | null;
// };
