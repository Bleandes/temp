export interface ScreenProps {
  title: string;
  hideNavbar?: boolean;
  formButtons?: boolean;
  backButton?: boolean;
  includeButton?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  hideFooter?: boolean;
  renderAfterTitle?: () => JSX.Element;
  hideCancelButton?: boolean;
  editButton?: boolean;
  onEdit?: () => void;
  footerMargin?: string;
}
