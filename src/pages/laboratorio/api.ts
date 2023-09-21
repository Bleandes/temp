import {useApi} from '#hooks/use-api';
import {ILaboratorio} from './types';

export function useLaboratorioModuleApi() {
  const adicionarLaboratorioService = useApi<ILaboratorio>('POST', '/AdicionarLaboratorio');
  const retornaLaboratorioPorIdService = useApi<ILaboratorio>('GET', '/RetornaLaboratorioPorId');
  const editarLaboratorioService = useApi<ILaboratorio>('PUT', '/EditarLaboratorio');
  const excluirLaboratorioService = useApi('DELETE', '/ExcluirLaboratorio');
  const listaLaboratorioService = useApi<ILaboratorio[]>('GET', '/ListaLaboratorio');

  async function adicionarLaboratorio(params: Partial<ILaboratorio>, onSuccess: () => void) {
    return adicionarLaboratorioService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function retornaLaboratorioPorId(id: string) {
    return retornaLaboratorioPorIdService.fetch({
      dynamicParams: {id},
    });
  }

  async function editarLaboratorio(params: Partial<ILaboratorio>, onSuccess: () => void) {
    return editarLaboratorioService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function excluirLaboratorio(id: string, onSuccess: () => void) {
    return excluirLaboratorioService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    adicionarLaboratorio,
    retornaLaboratorioPorId,
    editarLaboratorio,
    excluirLaboratorio,
    listaLaboratorio: () => listaLaboratorioService.fetch(),
  };
}
