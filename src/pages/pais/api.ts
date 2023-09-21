import {useApi} from '#hooks/use-api';
import {IPais} from './types';

export function usePaisModuleApi() {
  const adicionarPaisService = useApi<IPais>('POST', '/AdicionarPais');
  const retornaPaisPorIdService = useApi<IPais>('GET', '/RetornaPaisPorId');
  const editarPaisService = useApi('PUT', '/EditarPais');
  const excluirPaisService = useApi('DELETE', '/ExcluirPais');
  const listaPaisService = useApi<IPais[]>('GET', '/ListaPais');

  async function adicionarPais(params: Partial<IPais>, onSuccess: () => void) {
    return adicionarPaisService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function retornaPaisPorId(id: string) {
    return retornaPaisPorIdService.fetch({
      dynamicParams: {id},
    });
  }

  async function editarPais(params: Partial<IPais>, onSuccess: () => void) {
    return editarPaisService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function excluirPais(id: string, onSuccess: () => void) {
    return excluirPaisService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    adicionarPais,
    retornaPaisPorId,
    editarPais,
    excluirPais,
    listaPais: () => listaPaisService.fetch(),
  };
}
