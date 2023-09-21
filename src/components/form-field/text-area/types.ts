export interface TextAreaProps {
  value: any;
  onChange: (value: any) => void;
  readonly?: boolean;
  autoFocus?: boolean;
  placeHolder?: string;
  maxSize?: number;
  rows?: number;
}
