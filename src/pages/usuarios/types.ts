import {IEstabelecimento} from '../login/types';

export interface IUsuario {
  id: string;
  email: string;
  grupoUsuario: string;
  nomeGrupoUsuario: string;
  nomeAbreviado: string;
  nivelUsuario: number;
  forcarTrocaSenha?: boolean;
  avatar?: string;
  farmaceutico?: boolean;
  estabelecimentos?: IEstabelecimento[];
}
