export interface IPermissao {
  id: string;
  context: string;
  rota: string;
  modulo: string;
  categoria: string;
  programa: string;
  subPrograma: string;
}

export interface IGrupoUsuario {
  id: string;
  nome: string;
  permissoes: IPermissao[];
}
