export interface IBanco {
  id: string;
  nome: string;
  codigoBanco: string;
  carteira?: string;
  modalidade?: string;
  formaCobranca?: string;
  layout?: string;
  sequenciaRemessa?: number;
  nomeCedente?: string;
  cnpjCedente?: string;
  codigoCedente?: string;
  codigoTransmissao?: string;
  complementoTransmissao?: string;
  agencia?: string;
  agenciaDigito?: string;
  diasProtesto?: number;
  juros?: number;
  multa?: number;
  contaCorrente?: string;
  contaCorrenteDigito?: string;
  convenio?: string;
  producao?: boolean;
  localPagamento?: string;
  mensagemInstrucao1?: string;
  mensagemInstrucao2?: string;
  mensagemInstrucao3?: string;
  mensagemInstrucao4?: string;
  mensagemInstrucao5?: string;
}
