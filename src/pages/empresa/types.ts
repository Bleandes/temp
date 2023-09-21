import {IBairro} from '../bairro/types';
import {ICidade} from '../cidade/types';
import {IEstado} from '../estado/types';

export interface IEmpresa {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual?: string;
  inscricaoMunicipal?: string;
  regimeTributario: RegimeTributario;
  ddd: string;
  telefone: string;
  dddCelular?: string;
  celular?: string;
  email: string;
  dddWhatsApp?: string;
  whatsApp?: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cidadeId?: string;
  cidade?: ICidade;
  estadoId?: string;
  estado?: IEstado;
  bairroId?: string;
  bairro?: IBairro;
  nomeFarmaceutico: string;
  crf: number;
  cpfRespSNGPC?: string;
  usuarioSNGPC?: string;
  senhaSNGPC?: string;
  licencaFunc?: string;
  autoridadeSanitaria?: string;
  licencaMapa?: string;
  fornecedorId?: string;
  matrizId?: string;
  configuracaoEmpresa?: IConfiguracaoEmpresa;
}

export enum RegimeTributario {
  SimplesNacional = 0,
  SimplesNacionalSubLimite = 1,
  RegimeNormal = 2,
}

export interface IConfiguracaoEmpresa {
  id: string;
  logo?: string;
  banner?: string;
  cor?: string;
  markupPadrao?: number;
  emailConfigurado?: boolean;
  prazoPadrao?: number;
}

export interface TabProps {
  empresaForm: IEmpresa;
  empresaServer: IEmpresa;
  edit: boolean;
  handleFormChange: (key: string, value: any) => void;
  handleGetFormValue: (key: string) => void;
  handleGetFormErrors: (key: string) => void;
  handleSetFormValue: (values: any) => void;
  toucheds: string[];
}
