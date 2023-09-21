import {useApi} from '#hooks/use-api';

import {IEmpresa} from './types';

export function useEmpresaModuleApi() {
  const editarEmpresaService = useApi('PUT', '/EditarEmpresa');
  const retornaEmpresaPorIdService = useApi<IEmpresa>('GET', '/RetornaEmpresaPorId');

  async function editarEmpresa(params: IEmpresa, onSuccess?: () => void) {
    return await editarEmpresaService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    retornaEmpresaPorId: () => retornaEmpresaPorIdService.fetch(),
    editarEmpresa,
  };
}
