export interface MultiSelectDropDownProps {
  value: any;
  onChange: (value: any) => void;
  filterBy: string;
  route: string;
  pageSize: number;
  displayBy?: string;
  placeHolder: string;
  readonly?: boolean;
}
