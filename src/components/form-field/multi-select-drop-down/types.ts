export interface MultiSelectDropDownProps {
  data: any[];
  value: any;
  onChange: (value: any) => void;
  filterBy: string;
  displayBy?: string;
  placeHolder: string;
  readonly?: boolean;
  openDirectionTop?: boolean;
  label?: string;
  required?: boolean;
  error?: string;
}
