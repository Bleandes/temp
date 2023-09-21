import {IBanco} from '#pages/banco/types';
import {IFornecedor} from '#pages/fornecedor/types';
import {IPlanoDeConta} from '#pages/plano-de-contas/types';
import {IPortador} from '#pages/portador/types';

export interface IDuplicatasView {
  id: string;
  observacao: string;
  dataVencimento: string;
  dataPagamento?: string;
  valor: number;
  valorPago?: number;
  numeroFatura: string;
  numeroParcela: number;
  contasAPagarId: string;
  fornecedor: IFornecedor;
  fornecedorId: string | null;
  planoDeContas?: IPlanoDeConta;
  planoDeContasId?: string;
  banco?: IBanco;
  bancoId?: string;
  portador?: IPortador;
  portadorId?: string;
}

export interface IDuplicatasContasAPagar {
  id?: string;
  observacao: string;
  dataVencimento: string;
  dataPagamento: string | null;
  valor: number;
  valorPago: number;
  numeroFatura: string;
  numeroParcela: string;
  contasAPagarId: string | null;
}

export interface IContasAPagar {
  id: string;
  observacao: string;
  dataEmissao: string;
  valor: number;
  valorPago?: number;
  numeroFatura: number;
  quantidadeParcela: number;
  fornecedorId: string;
  fornecedor: IFornecedor;
  planoDeContasId?: string;
  planoDeContas?: IPlanoDeConta;
  bancoId?: string;
  banco?: IBanco;
  portadorId?: string;
  portador?: IPortador;
  duplicatasContasAPagar: IDuplicatasContasAPagar[];
}

export interface IViewContasAPagas {
  id: number;
  observacao: string;
  dataVencimento: string;
  dataPagamento: string | null;
  valor: number;
  valorPago: number;
  numeroFatura: string;
  numeroParcela: number;
  ContasAPagarId: number;
  nomeFornecedor: string;
}

export interface EditContaRequest {
  id: string;
  observacao: string;
  planoDeContasId: string | null;
  bancoId: string | null;
  portadorId: string | null;
  duplicatasContasAPagarEdit: EditDuplicataRequest;
}

export interface EditDuplicataRequest {
  id: string;
  valor: number;
  dataVencimento: string;
}

export interface PagarContaRequest {
  id: string;
  valorPago: number;
  dataPagamento: string;
}
