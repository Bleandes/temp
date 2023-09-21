export interface CheckBoxProps {
  onMouseClick: () => void;
  readonly: boolean;
  value: boolean;
  name: string;
  minWidth: number;
  error?: string;
}
