export interface DropDownProps {
  value: any;
  onChange: (value: any) => void;
  data: any[];
  filterBy: string;
  placeHolder?: string;
  readonly?: boolean;
  disableFilter?: boolean;
}
