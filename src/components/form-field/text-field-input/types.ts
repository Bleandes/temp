import {HTMLInputTypeAttribute} from 'react';

export interface TextFieldProps {
  label?: string;
  value: any;
  onChange: (value: any) => void;
  readonly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  placeHolder?: string;
  mask?: string;
  maxSize?: number;
  textInputType?: HTMLInputTypeAttribute;
  isPassword?: boolean;
}
