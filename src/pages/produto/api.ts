import {useApi} from '#hooks/use-api';
import {IProduto} from './types';

export function useProdutoModuleApi() {
  const retornaProdutoPorIdService = useApi<IProduto>('GET', '/RetornaProdutoPorId');
  const listaProdutoSevice = useApi<IProduto[]>('GET', '/ListaProduto');
  const excluirProdutoService = useApi('DELETE', '/ExcluirProduto');
  const adicionarProdutoService = useApi('POST', '/AdicionarProduto');
  const editarProdutoService = useApi('PUT', '/EditarProduto');

  async function retornaProdutoPorId(id: string) {
    return await retornaProdutoPorIdService.fetch({
      dynamicParams: {id},
    });
  }

  async function excluirProduto(id: string, onSuccess?: () => void) {
    return await excluirProdutoService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  async function adicionarProduto(body: Partial<IProduto>, onSuccess?: () => void) {
    return await adicionarProdutoService.fetch({
      dynamicParams: body,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function editarProduto(body: Partial<IProduto>, onSuccess?: () => void) {
    return await editarProdutoService.fetch({
      dynamicParams: body,
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    retornaProdutoPorId,
    excluirProduto,
    adicionarProduto,
    editarProduto,
    listaProduto: () => listaProdutoSevice.fetch(),
  };
}
