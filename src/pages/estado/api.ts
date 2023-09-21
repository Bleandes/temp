import {useApi} from '#hooks/use-api';
import {IEstado} from './types';

export function useEstadoModuleApi() {
  const adicionarEstadoService = useApi<IEstado>('POST', '/AdicionarEstado');
  const retornaEstadoPorIdService = useApi<IEstado>('GET', '/RetornaEstadoPorId');
  const editarEstadoService = useApi('PUT', '/EditarEstado');
  const excluirEstadoService = useApi('DELETE', '/ExcluirEstado');
  const listaAliquotaEstadoPorIdEstadoService = useApi('GET', '/ListaAliquotaEstadoPorIdEstado');
  const listaEstadoService = useApi<IEstado[]>('GET', '/ListaEstado');
  const adicionarAliquotaEstadoService = useApi('POST', '/AdicionarAliquotaEstado');
  const editarAliquotaEstadoService = useApi('PUT', '/EditarAliquotaEstado');
  const excluirAliquotaEstadoService = useApi('DELETE', '/ExcluirAliquotaEstado');

  async function adicionarEstado(params: Partial<IEstado>, onSuccess: () => void) {
    return adicionarEstadoService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function retornaEstadoPorId(id: string) {
    return retornaEstadoPorIdService.fetch({
      dynamicParams: {id},
    });
  }

  async function editarEstado(params: Partial<IEstado>, onSuccess?: () => void) {
    return editarEstadoService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function excluirEstado(id: string, onSuccess?: () => void) {
    return excluirEstadoService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  async function listaAliquotaEstadoPorIdEstado(id: string) {
    return listaAliquotaEstadoPorIdEstadoService.fetch({
      dynamicParams: {id},
    });
  }

  async function listaEstado() {
    return listaEstadoService.fetch();
  }

  async function adicionarAliquotaEstado(params: any) {
    return adicionarAliquotaEstadoService.fetch({
      dynamicParams: params,
    });
  }

  async function editarAliquotaEstado(params: any) {
    return editarAliquotaEstadoService.fetch({
      dynamicParams: params,
    });
  }

  async function excluirAliquotaEstado(id: string) {
    return excluirAliquotaEstadoService.fetch({
      dynamicParams: {id},
    });
  }

  return {
    adicionarEstado,
    retornaEstadoPorId,
    editarEstado,
    excluirEstado,
    listaAliquotaEstadoPorIdEstado,
    listaEstado,
    adicionarAliquotaEstado,
    editarAliquotaEstado,
    excluirAliquotaEstado,
  };
}
