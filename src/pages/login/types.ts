import {IConfiguracaoEmpresa} from '../empresa/types';
import {IPermissao} from '../grupo-usuario/types';

export interface LoginResponse {
  jwt: string;
  permissoes: IPermissao[];
  sessionInfo: ISessionInfo;
}

export interface ISessionInfo {
  id: string;
  email: string;
  nomeAbreviado: string;
  cidade: string;
  farmaceutico: boolean;
  forcarTrocaSenha: boolean;
  nivel: number;
  razaoSocial: string;
  nomeEmpresa: string;
  grupoUsuario: string;
  nomeGrupoUsuario: string;
  estabelecimentos: IEstabelecimento[];
  acessoEstabelecimentos: IEstabelecimento[];
  avatar?: string;
  configs?: any;
  configuracaoEmpresa?: IConfiguracaoEmpresa;
}

export interface IEstabelecimento {
  id: number;
  empresaId: string;
  nomeFantasia: string;
  razaoSocial: string;
}
