import {GridColDef} from '@mui/x-data-grid-pro';

export type SwapTableOperationType = 'add' | 'remove';

export interface SwapTableProps {
  leftColumnDefinition: GridColDef | any;
  rightColumnDefinition: GridColDef | any;
  leftData: any[];
  rightData: any[];
  setLeftData: (newValues: any[]) => void;
  setRightData: (newValues: any[]) => void;
  viewHeight?: string;
  viewWidth?: string;
  margin?: string;
  rigthWidth?: string;
  leftWidth?: string;
  leftTableName?: string;
  rightTableName?: string;
  readonly?: boolean
}
