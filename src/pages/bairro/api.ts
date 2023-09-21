import {useApi} from '#hooks/use-api';
import {IBairro} from './types';

export function useBairroModuleApi() {
  const adicionarBairroService = useApi<IBairro>('POST', '/AdicionarBairro');
  const retornaBairroPorIdService = useApi<IBairro>('GET', '/RetornaBairroPorId');
  const editarBairroService = useApi('PUT', '/EditarBairro');
  const excluirBairroService = useApi('DELETE', '/ExcluirBairro');
  const listaBairroService = useApi<IBairro[]>('GET', '/ListaBairro');

  async function adicionarBairro(params: Partial<IBairro>, onSuccess: () => void) {
    return adicionarBairroService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function retornaBairroPorId(id: string) {
    return retornaBairroPorIdService.fetch({
      dynamicParams: {id},
    });
  }

  async function editarBairro(params: Partial<IBairro>, onSuccess: () => void) {
    return editarBairroService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function excluirBairro(id: string, onSuccess: () => void) {
    return excluirBairroService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    adicionarBairro,
    retornaBairroPorId,
    editarBairro,
    excluirBairro,
    listaBairro: () => listaBairroService.fetch(),
  };
}
