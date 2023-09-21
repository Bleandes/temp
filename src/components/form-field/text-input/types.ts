export interface TextInputProps {
  value: any;
  onChange: (value: any) => void;
  label?: string;
  mask?: string;
  isPassword?: boolean;
  readonly?: boolean;
  autoFocus?: boolean;
  placeHolder?: string;
  maxSize?: number;
  required?: boolean;
  error?: string;
  textInputType?: string;
}
