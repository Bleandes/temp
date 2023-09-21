import {MSApiTypes} from '#hooks/use-api';

export interface AutoFetchTableProps {
  autoHeight?: boolean;
  columns: any;
  route: string;
  height?: string;
  hideColumns?: any;
  customApiClient?: MSApiTypes;
  noPagination?: boolean;
  hideSearch?: boolean;
  extraParams?: any;
  tableName?: string;
}

export interface IPagination {
  page: number;
  pageSize: number;
  asc?: boolean;
  sortBy?: string;
  search?: string;
}

export interface ListaPaginacaoResponse<T = any> {
  values: T[];
  pageCount: number;
}
