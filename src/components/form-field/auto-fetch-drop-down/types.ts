export interface DropDownProps {
  value: any;
  onChange: (value: any) => void;
  filterBy: string;
  placeHolder: string;
  route: string;
  pageSize: number;
  readonly?: boolean;
  label?: string;
  required?: boolean;
  error?: string;
}
