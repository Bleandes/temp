export interface IFiltroContasAPagar {
  fornecedorId: string | null;
  planoDeContasId: string | null;
  dataInicial: string;
  dataFinal: string;
  classificacao: number;
}

export interface IPlanoDeConta {
  id: string;
  nivelConta: number;
  numeroConta: string;
  numeroContaPai: string;
  descricao: string;
}
