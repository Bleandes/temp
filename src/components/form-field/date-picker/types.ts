export interface DatePickerProps {
  value: any;
  onChange?: (value: any) => void;
  readonly?: boolean;
  autoFocus?: boolean;
  label: string;
  error?: string;
  required?: boolean;
}
