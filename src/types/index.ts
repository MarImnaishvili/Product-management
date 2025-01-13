/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColDef, GridApi } from "ag-grid-community";
//import { SetStateAction } from "react";

export interface Post {
  id: string;
  action: any;
  title: string;
  views: number;
  active: boolean;
  date: string;
}

export interface Product {
  id: number | undefined;
  action?: any;
  productCode: string;
  productName: string;
  productCategory: string;
  productVendor: string;
  productDescription: string;
  productQtyInStock: number;
  productPrice: number;
  msrp: number;
  isAvailable: boolean;
  createdBy?: string;
  createdTimestamp?: string;
  updatedBy?: string;
  updatedTimestamp?: string;
}
//export type RowDataType = Post | Product;

// Define GridOptions interface with generics
export interface GridOptionsType<T> {
  columnDefs: ColDef<T, any>[];
  rowData: Product[];
  filteredData?: T[];
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
  mode: "view" | "edit" | "New";
  onSave: (updatedPost: Post) => void;
}

export interface PropsActionComponentProps {
  data: Post | Product | undefined;
  onSave: (updatedData: Product) => Promise<void>; // onSave is passed from PostComponent
}
// export type HandleSaveProps = {
//   gridApi: GridApi | null;
// };

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "checkbox" | "date";
  disabled: boolean;
}

export interface ProductModalProps {
  rowData: Product;
  onClose: () => void;
  open: boolean;
  onSave: (data: Product) => void;
  mode: "view" | "edit" | "New";
}
