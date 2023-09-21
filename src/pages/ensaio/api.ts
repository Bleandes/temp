import {useApi} from '#hooks/use-api';
import {IEnsaio} from './types';

export function useEnsaioModuleApi() {
  const listaEnsaioService = useApi<IEnsaio[]>('GET', '/ListaEnsaio', {});

  return {
    listaEnsaio: () => listaEnsaioService.fetch(),
  };
}
