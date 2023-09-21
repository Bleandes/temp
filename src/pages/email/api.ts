import {useApi} from '#hooks/use-api';
import {IEmail} from './types';

export function useEmailModuleApi() {
  const adicionarEmailService = useApi<IEmail>('POST', '/AdicionarEmail');
  const testEmailService = useApi<IEmail>('POST', '/TestEmail');
  const retornaEmailsPorEmpresaIdService = useApi<IEmail[]>('GET', '/RetornaEmailsPorEmpresaId');

  async function adicionarEmail(params: Partial<IEmail>, onSuccess: () => void) {
    return adicionarEmailService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  async function testEmail(params: Partial<IEmail>, onSuccess: () => void) {
    return testEmailService.fetch({
      dynamicParams: params,
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    adicionarEmail,
    testEmail,
    retornaEmailsPorEmpresaId: () => retornaEmailsPorEmpresaIdService.fetch(),
  };
}
