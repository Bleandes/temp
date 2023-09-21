export interface ConfirmModalProps {
  message?: string;
  title?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  content?: () => JSX.Element;
  hideButtons?: boolean;
  hideCancel?: boolean;
  modalWidth?: string;
}
