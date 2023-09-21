import {ReactElement} from 'react';

export interface IModuloLayout {
  name: string;
  categorias: ICategoriaLayout[];
  icon?: (size?: number, color?: string) => ReactElement;
  onlyAdmin?: boolean;
}

export interface ICategoriaLayout {
  name: string;
  programas: IProgramaLayout[];
  icon?: (size?: number, color?: string) => ReactElement;
  entrySubprograma?: string;
  route?: string;
}

export interface IProgramaLayout {
  name: string;
  entrySubprograma: string;
  route: string;
}

export interface ILayoutConfig {
  sideBarPinned?: boolean;
  selectedModulo?: string;
  selectedCategoria?: string;
  selectedPrograma?: string;
}
