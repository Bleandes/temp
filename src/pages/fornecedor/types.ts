export interface IFornecedor {
  id: string;
  nomeFornecedor: string;
  nomeFantasia: string;
  cnpj: string;
  cpf: string;
  inscricaoEstadual: string;
  cep: string;
  endereco: string;
  numeroEndereco: string;
  complemento: string;
  bairroId: string | null;
  cidadeId: string | null;
  estadoId: string;
  ddd: string;
  telefone: string;
  celular: string;
  dddCelular: string;
  email: string;
  homePage: string;
  contato: string;
  telefoneContato: string;
  bancoId: string | null;
  agencia: string;
  contaCorrenteFornecedor: string;
  responsavelTecnico: string;
  alvaraSanitario: string;
  autorizacaoFuncionamento: string;
  autorizacaoEspecial: string;
  licencaMapa: string;
  cadastroFarmacia: string;
  planoDeContaId: string | null;
  valorMinimoPedido: number;
  formaPagamento: string;
  previsaoEntrega: number;
  frete: string;
  observacoes: string;
  usuarioFornecedor: string;
  senhaFornecedor: string;
  hostFornecedor: string;
  contribuinte: number | null;
}

export interface IFornecedorGeral {
  id: string;
  nomeFornecedor: string;
  nomeFantasia: string;
  cnpj: string;
  cpf: string;
  inscricaoEstadual: string;
  cep: string;
  endereco: string;
  numeroEndereco: string;
  complemento: string;
  bairroId: string | null;
  cidadeId: string | null;
  estadoId: string;
  ddd: string;
  telefone: string;
  celular: string;
  dddCelular: string;
  email: string;
  homePage: string;
  contato: string;
  telefoneContato: string;
  contribuinte: number | null;
}

export interface IFornecedorComplemento {
  bancoId: string | null;
  agencia: string;
  contaCorrenteFornecedor: string;
  responsavelTecnico: string;
  alvaraSanitario: string;
  autorizacaoFuncionamento: string;
  autorizacaoEspecial: string;
  licencaMapa: string;
  cadastroFarmacia: string;
  planoDeContaId: string | null;
  valorMinimoPedido: number;
  formaPagamento: string;
  previsaoEntrega: number;
  frete: string;
  observacoes: string;
  usuarioFornecedor: string;
  senhaFornecedor: string;
  hostFornecedor: string;
}

export interface TabGeralProps {
  formInfos: any;
  handleFormChange: (key: string, value: any) => void;
  handleGetFormValue: (key: string) => void;
  handleGetFormErrors: (key: string) => void;
  handleSetFormValue: (values: any) => void;
  formType: string;
}

export interface IFornecedorView {
  id: string;
  nomeFornecedor: string;
  valorMinimoPedido?: number;
  formaPagamento?: string;
  previsaoEntrega?: number;
  frete?: string;
  observacoes?: string;
  cpf?: string;
  cnpj?: string;
  email?: string;
}
