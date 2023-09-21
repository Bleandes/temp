import {useApi} from '#hooks/use-api';
import {IGrupo} from './types';

export function useGrupoModuleApi() {
  const retornaGrupoPorIdService = useApi<IGrupo>('GET', '/RetornaGrupoPorId');
  const listaGrupoSevice = useApi<IGrupo[]>('GET', '/ListaGrupo');
  const excluirGrupoService = useApi('DELETE', '/ExcluirGrupo');
  const adicionarGrupoService = useApi('POST', '/AdicionarGrupo');
  const editarGrupoService = useApi('PUT', '/EditarGrupo');

  async function retornaGrupoPorId(id: string) {
    return await retornaGrupoPorIdService.fetch({
      dynamicParams: {id},
    });
  }

  async function excluirGrupo(id: string, onSuccess?: () => void) {
    return await excluirGrupoService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  async function adicionarGrupo(body: Partial<IGrupo>, onSuccess?: () => void) {
    return await adicionarGrupoService.fetch({
      dynamicParams: body,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function editarGrupo(body: Partial<IGrupo>, onSuccess?: () => void) {
    return await editarGrupoService.fetch({
      dynamicParams: body,
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    retornaGrupoPorId,
    excluirGrupo,
    adicionarGrupo,
    editarGrupo,
    listaProduto: () => listaGrupoSevice.fetch(),
  };
}
