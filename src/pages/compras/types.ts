import {IFornecedor, IFornecedorView} from '../fornecedor/types';
import {IProduto, IProdutoView} from '../produto/types';
import {IUnidade} from '../unidade/types';

export interface CompraFornecedor {
  id: string;
  compraId: string;
  observacao?: string;
  statusCotacao?: number;
  formaPagamento?: string;
  frete?: string;
  dataPreveEntrega?: string;
  dataCadastro?: string;
  statusPedido?: number;
  numeroNota?: number;
  fornecedorId: string;
  numeroCompraFornecedor?: number;
  fornecedor?: IFornecedorView;
  itensCompraFornecedor: ItensCompraFornecedor[];
  cor?: {};
  melhorCompra?: boolean;
  valorSelecionado?: number;
}
export interface ItensCompraFornecedor {
  id: string;
  produtoId?: string;
  produto?: IProdutoView;
  comprar: boolean;
  dataValidade?: string;
  compraFornecedorId: string;
  quantidadeCompra?: number;
  quantidade?: number;
  valorTotal?: number;
  valorUnitario?: number;
  quantidadeCompraUnidadeEstoque?: number;
  valorUnitarioUnidadeEstoque?: number;
  statusItem?: number;
  unidadeFornecedorId?: string;
  unidadeFornecedor?: Partial<IUnidade>;
  sugestao: boolean;
  valorFornecedor?: number;
  cor?: {};
  entrega?: string;
  indisponivel: boolean;
}

export interface ExtraInformationCompra {
  id: string;
  formaPagamento: string;
  frete: string;
  dataPreveEntrega: string;
  observacao: string;
  [key: string]: any;
}

export interface SendRequest {
  addList: string[];
  removeList: string[];
  comprasFornecedores: ICompraFornecedor[];
}

export interface IRequestUltimasVendas {
  dataInicial: string;
  dataFinal: string;
  produtoId: string;
}

export interface IResponseUltimasVendas {
  ultimasVendas: IUltimasVendas[];
  produto: IProduto;
}

export interface IUltimasVendas {
  id: string;
  tipo: string;
  numeroVenda: number;
  ordem: string;
  dataDeEmissao: string;
  quantidade: number;
  valorCusto: number;
  valorVenda: number;
  valorLiquido: number;
}

export interface IFiltroCompras {
  tipoCompra: number;
  tipoDemanda: number | null;
  vendaDe: string | null;
  vendaAte: string | null;
  curvaAbc: number;
  consideraEncomendaFaltas: boolean;
  tempoDeReposicao: number;
  quantidadeDias: number;
  tipoValor: number;
  aPartirDe: string | null;
  saldoQuantidadeComprometida: boolean;
  laboratorioId: string | null;
  fornecedoresIds: string[];
  gruposIds: string[];
  produtosIds: string[];
  empresaId: string | null;
  considerarApenasEmpresaSelecionada: boolean;
  filiais: number[] | null;
}

export interface IItemsCompra {
  id?: string;
  contaId: string;
  integracaoId: string;
  grupoId: string;
  laboratorioId: string;
  produtoId: string;
  comprar: boolean;
  curva: string;
  encomenda: boolean;
  estoque: number;
  unidadeEstoque: string;
  estoqueMaximo: number;
  estoqueMinimo: number;
  comprasId: string;
  quantidadeCompra: number;
  quantidadeVendida: number;
  quantidadeTotal: number;
  valorTotal: number;
  valorUnitario: number;
  valorVendido: number;
  selecionadoGerar: string;
  consumoDiario: number;
  siglaUnidade: string;
  quantidadeCompraMaxima: number;
  fornecedorId?: string;
  nomeFornecedor: string;
  descricao: string;
  descricaoLaboratorio: string;
  codigoCas: string;
  codigoDcb: string;
  codigoBarras: string;
  codigoGrupo: string;
  codigoProduto: string;
  lstItenscompraEstabelecimento: IItensCompraFilial[];
}

export interface ICompraFornecedor {
  id: string;
  dataDeCadastro?: string;
  compraId: string;
  observacao: string;
  statusCotacao: number;
  formaPagamento: string;
  frete: string;
  dataPreveEntrega?: string;
  statusPedido: number;
  numeroNota: number;
  fornecedorId: string;
  fornecedor?: IFornecedor;
  itensCompraFornecedor: IItemsCompraFornecedor[];
  isEdited?: boolean;
  isSaved?: boolean;
}

export interface ICotacao {
  id: string;
  compraId: string;
  nomeFornecedor: string;
  dataDeCadastro: string;
  fornecedorId: string;
  total: string;
  statusCotacao: number;
  cor: string;
}

export interface IResponseUltimasCompras {
  ultimasCompras: IUltimasCompras[];
  produto: IProduto;
}

export interface IRequestUltimasCompras {
  produtoId: string;
  dataInicial: string;
  dataFinal: string;
}

export interface IUltimasCompras {
  dataDeEmissao: string;
  nomeFornecedor: string;
  dataDeCadastro: string;
  serieNota: string;
  numeroNota: string;
  quantidadeUnidadeEstoque: number;
  siglaUnidade: string;
  custo: number;
  valorIpi: number;
  valorFreteItem: number;
  valorDiversos: number;
  total: number;
  validade?: string;
  valorUnitario: number;
}

export interface IResponseCotacaoCompras {
  fornecedores: IFornecedor[];
  cotacoes: ICotacao[];
}

export interface IFiltroCotacaoCompra {
  dataInicial: string;
  dataFinal: string;
}

export interface IFiltroRelatorioCompras {
  compraId: string;
  fornecedoresIds: string[];
  contato: string;
  dataLimite: string | null;
  para: string;
  cc: string;
  tipoEnvio: number;
  modoEnvio: number | null;
}

export interface IItemsCompraFornecedor {
  id: string;
  grupoId: string;
  produtoId: string;
  produto?: IProduto;
  comprar: boolean;
  dataValidade: string | null;
  descricaoProduto: string;
  compraFornecedorId: string;
  quantidadeCompra: number;
  valorTotal: number;
  valorUnitario: number;
  quantidadeCompraUnidadeEstoque: number;
  valorUnitarioUnidadeEstoque?: number;
  unidadeFornecedorId?: string;
  numeroNota: number;
  serieNota: string;
  statusItemPedido: number;
  selecionadoGerar: string;
  isEdited?: boolean;
  isSaved?: boolean;
  quantidade: number;
  unidadeFornecedor?: IUnidade;
  valorFornecedor: number;
  entrega?: string;
  indisponivel: boolean;
}

export interface ICompraFornecedorCotacao {
  compraId: string;
  fornecedorId: string;
}

export interface IDadosCotacao {
  nomeFornecedor: string;
  numeroCotacao: string;
  emissao?: string;
  prazo?: string;
  tempoExpiracao?: string;
}

export interface IDadosEmpresa {
  nome: string;
  cidade: string;
  siglaEstado: string;
  cnpj: string;
  contato: string;
  telefone: string;
  email: string;
  logo: string;
  cor: string;
}

export enum TipoCompra {
  VENDA = 0,
  DEMANDA = 1,
  ESTOQUE_MINIMO = 2,
  ESTOQUE_MAXIMO = 3,
  CONSUMO = 4,
  ENCOMENDA_FALTAS = 5,
}

export enum StatusPedidoCotacao {
  ENVIADOCOTACAO = 0,
  ENVIADOPEDIDO = 1,
  FINALIZADO = 2,
  NAOENVIADO = 3,
}

export enum StatusCotacao {
  AEMITIR = 0,
  REJEITADA = 1,
  EMITIDA = 2,
  PROCESSADA = 3,
}

export enum StatusCompra {
  EMABERTO = 0,
  PARCIAL = 1,
  COMPLETO = 2,
  CANCELADO = 3,
}

export interface IItensCompraFiltro {
  id?: number;
  grupoId: string;
  produtoId: string;
  fornecedorId?: string;
  descricaoProduto: string;
  descricaoGrupo?: string;
  descricaoLaboratorio?: string;
  curvaAbc?: string;
  estoqueMinimo: number;
  estoqueMaximo: number;
  quantidadeCompra: number;
  quantidadeVendida: number;
  valorVendido: number;
  estoque: number;
  valorUnitario: number;
  valorTotal: number;
  TotalParaDias: number;
  comprar: boolean;
  nomeFornecedor?: string;
  codigoCas?: string;
  codigoDcb?: string;
  codigoBarras?: string;
  laboratorioId?: string;
  encomenda?: number;
  consumoDiario?: number;
  valorCusto?: number;
  valorCustoMedio?: number;
  unidadeEstoque?: string;
  unidadeEstoqueId?: string;
  quantidadeTotal?: number;
  valorCustoReferencia?: number;
  fatorReferencia?: number;
  lstItenscompraEstabelecimento: IItensCompraFilial[];
  lstEstabelecimentos: number[];
}

export interface IItensCompraFilial {
  idEstabelecimento: number;
  quantidadeCompra: number;
  razaoSocial?: string;
  estoqueMaximo?: number;
  estoqueMinimo?: number;
  quantidadeVendida?: number;
  valorVendido?: number;
  estoque?: number;
  consumoDiario?: number;
}

export interface ICompraCreate {
  statusCompra: number;
  totalCompra: number;
  tempoDeReposicaoMaxima?: number;
  vendaDe?: string;
  vendaAte?: string;
  curvaAbc: number;
  laboratorioId?: string;
  tipoCompra: number;
  tipoDemanda?: number;
  consideraEncomendaFaltas?: boolean;
  tempoDeReposicao?: number;
  quantidadeDias?: number;
  tipoValor?: number;
  aPartirDe?: string;
  saldoQuantidadeComprometida?: boolean;
  itensCompras: IItensCompraCreate[];
  fornecedoresIds: string[];
  gruposIds?: string[];
  produtosIds?: string[];
}

export interface IItensCompraCreate {
  laboratorioId?: string;
  fornecedorId?: string;
  produtoId: string;
  comprar: boolean;
  encomenda?: number;
  estoque: number;
  quantidadeCompra: number;
  quantidadeVendida: number;
  quantidadeTotal: number;
  valorTotal: number;
  valorUnitario: number;
  valorVendido: number;
  consumoDiario?: number;
  lstItenscompraEstabelecimento: IItensCompraFilial[];
}
