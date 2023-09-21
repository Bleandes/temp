import {useApi} from '#hooks/use-api';
import {EditContaRequest, IContasAPagar, PagarContaRequest} from './types';

export function useContasAPagarModuleApi() {
  const adicionarContasAPagarService = useApi('POST', '/AdicionarContasAPagar');
  const excluirContasAPagarService = useApi('DELETE', 'ExcluirContasAPagar');
  const editarContasAPagarService = useApi('PUT', '/EditarContasAPagar');
  const retornaContasAPagarPorIdService = useApi<IContasAPagar>('GET', '/RetornaContasAPagarPorId');
  const pagarContaService = useApi('PUT', '/PagarConta');
  const cancelarContaService = useApi('DELETE', '/CancelarConta');

  async function adicionarContasAPagar(conta: Partial<IContasAPagar>, onSuccess?: () => void) {
    return await adicionarContasAPagarService.fetch({
      dynamicParams: conta,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function excluirContasAPagar(id: string, onSuccess?: () => void) {
    return await excluirContasAPagarService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  async function retornaContasAPagarPorId(id: string) {
    return await retornaContasAPagarPorIdService.fetch({dynamicParams: {id}});
  }

  async function editarContasAPagar(request: EditContaRequest, onSuccess?: () => void) {
    return await editarContasAPagarService.fetch({
      dynamicParams: request,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function pagarConta(request: PagarContaRequest, onSuccess?: () => void) {
    return await pagarContaService.fetch({
      dynamicParams: request,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function cancelarConta(id: string, onSuccess?: () => void) {
    return await cancelarContaService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    adicionarContasAPagar,
    excluirContasAPagar,
    retornaContasAPagarPorId,
    editarContasAPagar,
    pagarConta,
    cancelarConta,
  };
}
