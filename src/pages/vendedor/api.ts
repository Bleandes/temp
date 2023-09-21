import {useApi} from '#hooks/use-api';

export function useVendedorModuleApi() {
  const listaVendedorService = useApi('GET', '/ListaVendedor');

  return {
    listaVendedor: () => listaVendedorService.fetch(),
  };
}
