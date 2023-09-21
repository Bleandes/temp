import {
  GridColDef,
  GridColumnOrderChangeParams,
  GridColumnResizeParams,
  GridEditMode,
  GridFeatureMode,
  GridRowClassNameParams,
  GridRowIdGetter,
  GridRowParams,
  GridSortModel,
  GridValidRowModel,
} from '@mui/x-data-grid-pro';

export interface DefaultTableProps {
  columnDefinition: GridColDef | any;
  tableName?: string;
  autoHeight?: boolean;
  tableHeight?: string;
  viewHeight?: string;
  viewWidth?: string;
  margin?: string;
  rowHeight?: number;
  setFilter?: (value: string) => void;
  page?: number;
  filter?: string;
  data?: any;
  totalPages?: number;
  setPage?: (value: number) => void;
  hidePagination?: boolean;
  hideFilter?: boolean;
  onSortModelChange?: (model: GridSortModel) => void;
  pageSize?: number;
  onPageSizeChange?: (value: number) => void;
  editMode?: GridEditMode;
  checkBoxCollum?: boolean;
  getRowClassName?: (params: GridRowClassNameParams<GridValidRowModel>) => string;
  className?: string;
  isRowSelectable?: (params: GridRowParams<GridValidRowModel>) => boolean;
  onRowClick?: (params: GridRowParams) => void;
  cellBackgroundColor?: string;
  onRowChange?: (newRow: any) => void;
  setSelectedCheckBoxes?: (checked: any[]) => void;
  selectedCheckBoxes?: any[];
  sortingMode?: GridFeatureMode;
  disableColumnMenu?: boolean;
  onColumnOrderChange?: (params: GridColumnOrderChangeParams) => void;
  onColumnWidthChange?: (params: GridColumnResizeParams) => void;
  extraLayoutInfo?: Record<string, any>;
  onColumnConfigReset?: () => void;
  getRowId?: GridRowIdGetter<GridValidRowModel>;
}

export interface PaginationProps {
  page: number;
  onPageChange: (value: number) => void;
  totalPages: number;
}

export interface FilterProps {
  value: string;
  placeHolder: string;
  onChange: (value: string) => void;
}
