import {useApi} from '#hooks/use-api';
import {IViaCep} from '#types/global-types';
import {IFornecedor} from './types';

export function useFornecedorModuleApi() {
  const listaFornecedorService = useApi<IFornecedor[]>('GET', '/ListaFornecedor');
  const adicionarFornecedorService = useApi<IFornecedor>('POST', '/AdicionarFornecedor');
  const retornaFornecedorPorIdService = useApi<IFornecedor>('GET', '/RetornaFornecedorPorId');
  const editarFornecedorService = useApi<IFornecedor>('PUT', '/EditarFornecedor');
  const excluirFornecedorService = useApi('DELETE', '/ExcluirFornecedor');
  const viaCepService = useApi<IViaCep>('GET', '', {client: 'viaCep'});

  async function adicionarFornecedor(params: Partial<IFornecedor>, onSuccess: () => void) {
    return adicionarFornecedorService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function retornaFornecedorPorId(id: string) {
    return retornaFornecedorPorIdService.fetch({
      dynamicParams: {id},
    });
  }

  async function editarFornecedor(params: Partial<IFornecedor>, onSuccess: () => void) {
    return editarFornecedorService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function excluirFornecedor(id: string, onSuccess: () => void) {
    return excluirFornecedorService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  async function viaCep(cep: string) {
    return viaCepService.fetch({
      dynamicRoute: `${cep}/json/`,
    });
  }

  return {
    adicionarFornecedor,
    retornaFornecedorPorId,
    editarFornecedor,
    excluirFornecedor,
    viaCep,
    listaFornecedor: () => listaFornecedorService.fetch(),
  };
}
