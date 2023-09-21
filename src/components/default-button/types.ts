export interface DefaultButtonProps {
  type: ButtonType;
  text?: string;
  onClick?: () => void;
  marginTop?: number;
  marginBottom?: number;
  buttonWidth?: string;
}

export enum ButtonType {
  confirm = 'confirm',
  cancel = 'cancel',
  save = 'save',
  include = 'include',
  back = 'back',
  filter = 'filter',
  remove = 'remove',
}
