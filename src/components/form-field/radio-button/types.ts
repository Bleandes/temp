export interface RadioButtonProps {
  value: any;
  onChange: (value: any) => void;
  options: string[];
  readonly: boolean;
  returnIndex: boolean;
  label?: string;
  required?: boolean;
  error?: string;
}
