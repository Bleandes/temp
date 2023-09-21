import {IFornecedor} from '../fornecedor/types';
import {IGrupoView} from '../grupo/types';
import {IUnidade} from '../unidade/types';

export interface IProduto {
  id: string;
  grupoId: string;
  descricao: string;
  valorCusto: number;
  valorCustoMedio: number;
  valorVenda: number;
  estoqueMinimo: number;
  estoqueMaximo: number;
  fornecedorId: string;
  dataUltimaCompra: string;
  curvaAbc: string;
  aliquotaIcms: number;
  calculo: string;
  produtoInativo: boolean;
  situacaoTributaria: string;
  codigoDcb?: string;
  codigoCas?: string;
  grupo?: IGrupoView;
  fornecedor?: IFornecedor;
  unidadeManipulacao: IUnidade;
  unidadeEstoque: IUnidade;
}

export interface IProdutoView {
  id: string;
  grupo?: IGrupoView;
  descricao: string;
  unidadeEstoque: Partial<IUnidade>;
  unidadeManipulacao: Partial<IUnidade>;
}

export enum CurvaAbc {
  GERAL = 3,
  A = 0,
  B = 1,
  C = 2,
}
