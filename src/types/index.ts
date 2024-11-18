import { ColDef } from "ag-grid-community";

export interface Post {
  id: string;
  title: string;
  views: number;
  active: boolean;
}

export interface Product {
  productId: string;
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
export interface GridOptions<T> {
  columnDefs: ColDef<T>[];
  filteredData: T[];
  error: string | null;
  loading: boolean;
  rowHeight?: number;
  gridWidth?: string;
  pagination?: boolean;
  paginationPageSize?: number;
  defaultColDef?: ColDef<T>;
  paginationPageSizeSelector?: number[];
  domLayout?: string;
  headerHeight?: number;
}

export interface DataGridProps<T> {
  gridOptions: GridOptions<T>;
}
