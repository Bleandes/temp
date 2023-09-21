import {useApi} from '#hooks/use-api';
import {IFaltasEncomendas} from './types';

export function useFaltasEncomendasApi() {
  const adicionarFaltasEncomendasService = useApi<IFaltasEncomendas[]>('POST', '/AdicionarFaltasEncomendas');
  const retornaFaltasEncomendasPorIdService = useApi('GET', '/RetornaFaltasEncomendasPorId');
  const editarFaltasEncomendasService = useApi('PUT', '/EditarFaltasEncomendas');
  const excluirFaltasEncomendasService = useApi('DELETE', '/ExcluirFaltasEncomendas');
  const concluirFaltasEncomendasService = useApi('GET', '/ConcluirFaltasEncomendas');

  async function adicionarFaltasEncomendas(params: Partial<IFaltasEncomendas>[], onSuccess: () => void) {
    return adicionarFaltasEncomendasService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function retornaFaltasEncomendasPorId(id: string) {
    return retornaFaltasEncomendasPorIdService.fetch({
      dynamicParams: {id},
    });
  }

  async function editarFaltasEncomendas(
    params: {id: any; faltasEncomendas: Partial<IFaltasEncomendas>[]},
    onSuccess?: () => void,
  ) {
    return editarFaltasEncomendasService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function excluirFaltasEncomendas(id: string, onSuccess?: () => void) {
    return excluirFaltasEncomendasService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  async function concluirFaltasEncomendas(id: string, onSuccess?: () => void) {
    return concluirFaltasEncomendasService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    adicionarFaltasEncomendas,
    retornaFaltasEncomendasPorId,
    editarFaltasEncomendas,
    excluirFaltasEncomendas,
    concluirFaltasEncomendas,
  };
}
