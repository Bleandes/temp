import {useApi} from '#hooks/use-api';

export function useClienteModuleApi() {
  const listaClienteService = useApi('GET', '/ListaCliente');

  return {
    listaCliente: () => listaClienteService.fetch(),
  };
}
