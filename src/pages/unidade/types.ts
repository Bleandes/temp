export interface IUnidade {
  id: string;
  sigla: string;
  descricao: string;
  tipo: number;
  fator?: string;
  unidadesConversoes: IUnidadeConversao[];
}

export interface IUnidadeConversao {
  id?: string;
  unidadeId?: string;
  unidadeConversaoId: string;
  unidadeConversao?: IUnidade;
  unidade?: IUnidade;
  fator: string;
}

export enum TipoUnidade {
  MASSA = 0,
  VOLUME = 1,
}
