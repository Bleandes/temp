import {ITributo} from '#pages/tributo/types';

export interface ICidade {
  id: string;
  nome: string;
  codigoIbge: number;
  tributoId?: string;
  tributo?: ITributo;
  codigoSiafi?: string;
}
