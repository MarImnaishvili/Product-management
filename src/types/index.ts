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
  id: number;
  action?: any;
  productCode: string;
  productName: string;
  productCategories: IcategoryInProduct[];
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

export interface ProductUpdated {
  id: undefined | number;
  action?: any;
  productCode: string;
  productName: string;
  productCategories: IcategoryInProduct[];
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
  data: Post | Product | ProductUpdated | undefined;
  onSave: (updatedData: ProductUpdated) => Promise<void>; // onSave is passed from PostComponent
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
  rowData: ProductUpdated;
  onClose: () => void;
  open: boolean;
  onSave: (data: Product) => void;
  mode: "view" | "edit" | "New";
}

export interface CustomError {
  type: string;
  details: string;
}

export interface ProductCategories {
  id: number;
  name: string;
  description: boolean;
  code: string;
  createdTimestamp: string;
  createdBy: string;
  updatedBy: string;
  updatedTimestamp: string;
  products: Product[];
}

export interface IcategoryInProduct {
  id: number;
  name: string;
  code: string;
}

export type MultipleSelectCheckmarksProps = {
  value: string[]; // Current selected categories
  onChange: (selected: string[]) => void;
  isDisabled?: boolean;
  options: string[];
};

export type TcategoryObject = IcategoryInProduct[];

//Charts

export type TLineChart = {
  title: {
    text: string;
  };
  data: {
    period: string;
    quantity: number;
  }[];
  series:
    | {
        type: string;
        xKey: string;
        yKey: string;
        yName: string;
        stroke?: string;
        strokeWidth?: number;
        marker?: {
          size: number;
          fill: string;
          stroke: string;
          strokeWidth: number;
        };
      }[];
};

export type TProductChart = {
  title?: string;
  xKeyName?: string;
  yKeyName?: string;
  data: {
    period: string;
    quantity: number;
  }[];
};

export interface LineChartProps {
  title: string;
  data: {
    period: string;
    quantity: number;
  }[];
  xKeyName: string;
  yKeyName: string;
  YName: string;
}
