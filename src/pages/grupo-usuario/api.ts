import {useApi} from '#hooks/use-api';
import {IGrupoUsuario, IPermissao} from './types';

export function useGrupoUsuarioModuleApi() {
  const listarPermissoesService = useApi<IPermissao[]>('GET', '/ListarPermissoes');
  const adicionarGrupoUsuarioService = useApi('POST', '/AdicionarGrupoUsuario');
  const listarGrupoUsuarioService = useApi<IGrupoUsuario[]>('GET', '/ListarGrupoUsuario');
  const visualizarGrupoUsuarioService = useApi<IGrupoUsuario>('GET', '/VisualizarGrupoUsuario');
  const excluirGrupoUsuarioService = useApi('DELETE', '/ExcluirGrupoUsuario');
  const editarGrupoUsuarioService = useApi('PUT', '/EditarGrupoUsuario');

  async function adicionarGrupoUsuario(nome: string, permissoes: IPermissao[], onSuccess?: () => void) {
    await adicionarGrupoUsuarioService.fetch({
      dynamicParams: {
        nome: nome,
        grupoPermissao: permissoes,
      },
      dynamicOnSuccess: onSuccess,
    });
  }

  async function visualizarGrupoUsuario(id: string) {
    return await visualizarGrupoUsuarioService.fetch({
      dynamicParams: {id},
    });
  }

  async function excluirGrupoUsuario(id: string, onSuccess?: () => void) {
    return await excluirGrupoUsuarioService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  async function editarGrupoUsuario(request: Partial<IGrupoUsuario>, onSuccess?: () => void) {
    return await editarGrupoUsuarioService.fetch({
      dynamicParams: request,
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    listarPermissoesService: () => listarPermissoesService.fetch(),
    listarGrupoUsuario: () => listarGrupoUsuarioService.fetch(),
    adicionarGrupoUsuario,
    visualizarGrupoUsuario,
    excluirGrupoUsuario,
    editarGrupoUsuario,
  };
}
