export interface SidebarProps {
  selectedModulo: string;
  selectedCategoria: string;
  selectedPrograma: string;
  setSelectedModulo: (value: string) => void;
  setSelectedCategoria: (value: string) => void;
  setSelectedPrograma: (value: string) => void;
  setShowModuloScreen: (value: boolean) => void;
  pinned: boolean;
  setPinned: (value: boolean) => void;
}
export interface IPossibleRoute {
  route: string;
  ref: string;
  modulo: string;
  categoria?: string;
  programa?: string;
}
