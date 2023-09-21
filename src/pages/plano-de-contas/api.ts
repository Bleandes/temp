import {useApi} from '#hooks/use-api';
import {IPlanoDeConta} from './types';

export function usePlanoDeContasModuleApi() {
  const listaPlanoDeContasSevice = useApi<IPlanoDeConta[]>('GET', '/ListaPlanoDeContas');

  return {
    listaPlanoDeContas: () => listaPlanoDeContasSevice.fetch(),
  };
}
