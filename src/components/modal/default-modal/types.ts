export interface ConfirmModalProps {
  show: boolean;
  title?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  hideButtons?: boolean;
  modalWidth?: string;
  closeButton?: boolean;
  headerMargin?: string;
}
