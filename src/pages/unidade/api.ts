import {useApi} from '#hooks/use-api';
import {IUnidade} from './types';

export function useUnidadeModuleApi() {
  const retornaUnidadePorIdService = useApi<IUnidade>('GET', '/RetornaUnidadePorId');
  const listaUnidadeService = useApi<IUnidade[]>('GET', '/ListaUnidade');
  const excluirUnidadeService = useApi('DELETE', '/ExcluirUnidade');
  const adicionarUnidadeService = useApi<IUnidade>('POST', '/AdicionarUnidade');
  const editarUnidadeService = useApi('PUT', '/EditarUnidade');

  async function adicionarUnidade(params: Partial<IUnidade>, onSuccess?: () => void) {
    return adicionarUnidadeService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function retornaUnidadePorId(id: string) {
    return retornaUnidadePorIdService.fetch({
      dynamicParams: {id},
    });
  }

  async function editarUnidade(params: Partial<IUnidade>, onSuccess?: () => void) {
    return editarUnidadeService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function excluirUnidade(id: string, onSuccess?: () => void) {
    return excluirUnidadeService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  async function listaUnidadeWithBearer(token: string) {
    return listaUnidadeService.fetch({
      dynamicHeaders: {Authorization: `Bearer ${token}`},
    });
  }

  return {
    adicionarUnidade,
    retornaUnidadePorId,
    editarUnidade,
    excluirUnidade,
    listaUnidadeWithBearer,
    listaUnidade: () => listaUnidadeService.fetch(),
  };
}
