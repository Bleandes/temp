export enum FormFieldTypes {
  textInput = 'textInput',
  checkbox = 'checkBox',
  dropDown = 'dropDown',
  radioButtons = 'radioButtons',
  multiSelectDropDown = 'multiSelectDropDown',
  datePicker = 'datePicker',
  textArea = 'textArea',
  autoFetchDropDown = 'autoFetchDropDown',
  autoFetchMultiSelectDropDown = 'autoFetchMultiSelectDropDown',
  switch = 'switch',
  textField = 'textField',
}

export interface FormFieldProps {
  value: any;
  fieldType: FormFieldTypes;
  onChange?: (value: any) => void;
  name?: string;
  readonly?: boolean;
  width?: string;
  minWidth?: number;
  error?: string | any;
  backgroundColor?: string;
  placeHolder?: string;
  autoFocus?: boolean;
  required?: boolean;
  data?: any[];
  filterDataBy?: string;
  displayDataBy?: string;
  options?: string[];
  mask?: string;
  isPassword?: boolean;
  maxSize?: number;
  returnIndexRadioButtons?: boolean;
  rowsTextArea?: number;
  route?: string;
  pageSize?: number;
  border?: boolean;
  switchColor?: string;
  openDirectionTop?: boolean;
  textInputType?: string;
}

export interface ViewProps {
  backgroundColor?: string;
  width?: string;
  minHeight?: number;
  marginTop?: number;
  readonly?: boolean;
  required?: boolean;
  hideTitle?: boolean;
  minWidth?: number;
  border?: boolean;
}

export interface FieldNameProps {
  marginBottom?: number;
  marginLeft?: number;
}
