export interface IReport {
  title: string;
  nomeEmpresa: string;
  perido?: {dataInicial: string; dataFinal: string};
  cabecalho: string[];
  widths: string[];
  widthsRodape?: string[];
  dados: any[];
  dadosRodaPe?: any[];
  orientation?: boolean;
  openPdf?: boolean;
  cnpj?: string;
  telefone?: string;
  contato?: string;
}
