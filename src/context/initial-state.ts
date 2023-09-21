import {ILayoutConfig} from '#layout/types';
import {IPermissao} from '#pages/grupo-usuario/types';
import {IEstabelecimento, ISessionInfo} from '#pages/login/types';

export interface IContext {
  swapState?: any;
}

export interface IPersistContext {
  auth?: string;
  permissoes?: IPermissao[];
  sessionInfo?: ISessionInfo;
  darkTheme?: boolean;
  contasAPagarToggle?: boolean;
  language?: string;
  currency?: string;
  estabelecimento?: IEstabelecimento;
  layoutConfig?: ILayoutConfig;
}

export const initialPersistValues = {
  auth: '',
  permissoes: [],
  sessionInfo: {} as ISessionInfo,
  darkTheme: false,
  contasAPagarToggle: false,
  language: 'pt-BR',
  currency: 'R$',
  estabelecimento: {} as IEstabelecimento,
  layoutConfig: {} as ILayoutConfig,
} as IPersistContext;

export const initialContextValues = {
  swapState: {},
} as IContext;
