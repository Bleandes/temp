import {useApi} from '#hooks/use-api';
import {IPortador} from './types';

export function usePortadorModuleApi() {
  const retornaPortadorPorIdService = useApi<IPortador>('GET', '/RetornaPortadorPorId');
  const listaPortadorSevice = useApi<IPortador[]>('GET', '/ListaPortador');
  const excluirPortadorService = useApi('DELETE', '/ExcluirPortador');
  const adicionarPortadorService = useApi('POST', '/AdicionarPortador');
  const editarPortadorService = useApi('PUT', '/EditarPortador');

  async function retornaPortadorPorId(id: string) {
    return await retornaPortadorPorIdService.fetch({
      dynamicParams: {id},
    });
  }

  async function excluirPortador(id: string, onSuccess?: () => void) {
    return await excluirPortadorService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  async function adicionarPortador(body: Partial<IPortador>, onSuccess?: () => void) {
    return await adicionarPortadorService.fetch({
      dynamicParams: body,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function editarPortador(body: Partial<IPortador>, onSuccess?: () => void) {
    return await editarPortadorService.fetch({
      dynamicParams: body,
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    retornaPortadorPorId,
    excluirPortador,
    adicionarPortador,
    editarPortador,
    listaPortador: () => listaPortadorSevice.fetch(),
  };
}
