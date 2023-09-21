import {useApi} from '#hooks/use-api';
import {IUsuario} from './types';

export function useUsuarioModuleApi() {
  const adicionarUsuarioService = useApi('POST', '/AdicionarUsuario');
  const listarUsuarioService = useApi('GET', '/ListarUsuarios');
  const excluirUsuarioService = useApi('DELETE', '/ExcluirUsuario');
  const visualizarUsuarioService = useApi<IUsuario>('GET', '/VisualizarUsuario');
  const editarUsuarioService = useApi('PUT', '/EditarUsuario');

  async function adicionarUsuario(user: Partial<IUsuario>, onSuccess: () => void) {
    return await adicionarUsuarioService.fetch({
      dynamicParams: user,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function excluirUsuario(id: string, onSuccess: () => void) {
    return await excluirUsuarioService.fetch({
      dynamicParams: {id},
      dynamicOnSuccess: onSuccess,
    });
  }

  async function editarUsuario(request: Partial<IUsuario>, onSuccess?: () => void) {
    return await editarUsuarioService.fetch({
      dynamicParams: request,
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    adicionarUsuario,
    listUsuario: () => listarUsuarioService.fetch(),
    excluirUsuario,
    visualizarUsuario: (id: string) => visualizarUsuarioService.fetch({dynamicParams: {id}}),
    editarUsuario,
  };
}
