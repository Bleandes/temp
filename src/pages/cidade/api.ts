import {useApi} from '#hooks/use-api';
import {ITributo} from '../tributo/types';
import {ICidade} from './types';

export function useCidadeModuleApi() {
  const adicionarCidadeService = useApi<ICidade>('POST', '/AdicionarCidade');
  const retornaCidadePorIdService = useApi<ICidade>('GET', '/RetornaCidadePorId');
  const editarCidadeService = useApi('PUT', '/EditarCidade');
  const excluirCidadeService = useApi('DELETE', '/ExcluirCidade');
  const listaTributoService = useApi<ITributo[]>('GET', '/ListaTributo');
  const listaCidadeService = useApi<ICidade[]>('GET', '/ListaCidade');

  async function adicionarCidade(params: Partial<ICidade>, onSuccess: () => void) {
    return adicionarCidadeService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function retornaCidadePorId(id: string) {
    return retornaCidadePorIdService.fetch({
      dynamicParams: {id},
    });
  }

  async function editarCidade(params: Partial<ICidade>, onSuccess: () => void) {
    return editarCidadeService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function excluirCidade(id: string, onSuccess: () => void) {
    return excluirCidadeService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    adicionarCidade,
    retornaCidadePorId,
    editarCidade,
    excluirCidade,
    listaTributo: () => listaTributoService.fetch(),
    listaCidade: () => listaCidadeService.fetch(),
  };
}
