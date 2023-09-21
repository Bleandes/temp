import {useApi} from '#hooks/use-api';
import {IBanco} from './types';

export function useBancoModuleApi() {
  const retornaBancoPorIdService = useApi<IBanco>('GET', '/RetornaBancoPorId');
  const listaBancoSevice = useApi<IBanco[]>('GET', '/ListaBanco');
  const excluirBancoService = useApi('DELETE', '/ExcluirBanco');
  const editarBancoService = useApi('PUT', '/EditarBanco');
  const adicionarBancoService = useApi('POST', '/AdicionarBanco');

  async function retornaBancoPorId(id: string) {
    return retornaBancoPorIdService.fetch({
      dynamicParams: {id},
    });
  }

  async function excluirBanco(id: string, onSuccess?: () => void) {
    return excluirBancoService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  async function editarBanco(body: Partial<IBanco>, onSuccess?: () => void) {
    return editarBancoService.fetch({
      dynamicParams: body,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function adicionarBanco(body: Partial<IBanco>, onSuccess?: () => void) {
    return adicionarBancoService.fetch({
      dynamicParams: body,
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    retornaBancoPorId,
    excluirBanco,
    editarBanco,
    adicionarBanco,
    listaBanco: () => listaBancoSevice.fetch(),
  };
}
