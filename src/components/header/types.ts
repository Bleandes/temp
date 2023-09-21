export interface HeaderProps {
  title?: string | null;
  includeButton?: boolean;
  renderAfterTitle?: () => JSX.Element;
  editButton?: boolean;
  onEdit?: () => void;
}
