import {IUnidade} from '#pages/unidade/types';

export interface IFaltasEncomendas {
  id: string | number;
  empresaId?: string;
  clienteId?: string;
  grupoId: string;
  produtoId: string;
  vendedorId: string;
  compraId?: string;
  observacao: string;
  previsaoDeEntrega?: string;
  quantidade: number;
  status?: number;
  telefone: string;
  tipo: number;
  ddd: string;
  descricaoProduto?: string;
  nomeGrupo?: string;
  unidadeEstoque?: IUnidade;
  filialId?: number;
}
