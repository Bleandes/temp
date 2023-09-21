import {isEmail, isEmpty} from '#helper/form-validations';
import {useTranslate} from '#hooks/use-translate';
import {IEmail} from './types';

export const initialValues: Partial<IEmail> = {
  ssl: false,
  conexaoSegura: false,
  tipo: 0,
};

export const validations = {
  email: [isEmpty(), isEmail()],
  server: [isEmpty()],
  port: [isEmpty()],
  senha: [isEmpty()],
};

export function useEmailConfig() {
  const {translate} = useTranslate();

  function tiposEmails() {
    return [
      {
        tipo: 0,
        descricao: translate('email.tipo.padrao'),
      },
      {
        tipo: 1,
        descricao: translate('email.tipo.compras'),
      },
      {
        tipo: 2,
        descricao: translate('email.tipo.vendas'),
      },
    ];
  }

  return {
    tiposEmails,
  };
}
