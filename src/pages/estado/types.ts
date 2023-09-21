export interface IEstado {
  id: string;
  nome: string;
  sigla: string;
  aliquotaIcmsEstado?: number;
  aliquotaFcpEstado?: number;
  difalComCalculoPorDentro?: boolean;
  difalComCalculoDeIsento?: boolean;
  checagemContribuinteIsento?: boolean;
  paisId: string | null;
}

export interface IEstadoAliquota {
  id: string;
  siglaEstadoOrigem: string;
  nomeEstadoOrigem: string;
  siglaEstadoDestino: string;
  nomeEstadoDestino: string;
  porcentagemIcms: number;
}

export interface IAliquotaEstado {
  id: string;
  estadoOrigemId: string;
  estadoDestinoId: string;
  estadoDestinoNome: string;
  estadoDestinoSigla: string;
  aliquotaIcms: number;
}
