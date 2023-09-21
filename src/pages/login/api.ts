import {ErrorMap} from '#errors/errors-map';
import {useApi} from '#hooks/use-api';
import {useGlobalContext} from '#hooks/use-global-context';
import {useThemeProvider} from '#theme/theme';
import {useNavigate} from 'react-router-dom';
import {LoginResponse} from './types';

export function useLoginModuleApi() {
  const context = useGlobalContext();
  const themeProvider = useThemeProvider();
  const navigate = useNavigate();
  const loginApi = useApi<LoginResponse>('POST', '/Login', {
    errorMessage: ErrorMap.ERRAPI02,
  });
  const resetSenhaService = useApi('PUT', '/ResetSenha');

  async function login(email: string, senha: string) {
    try {
      const response = await loginApi.fetch({
        dynamicParams: {
          email,
          senha,
        },
      });
      context.clearContext();
      context.setPersistContext('auth', response.jwt);
      context.setPersistContext('permissoes', response.permissoes);
      context.setPersistContext('sessionInfo', response.sessionInfo);
      context.setPersistContext('layoutConfig', {});
      themeProvider.updatePrimaryColor(response.sessionInfo.configuracaoEmpresa?.cor || '#cf0209');
      if (response.sessionInfo.forcarTrocaSenha) {
        setTimeout(() => {
          navigate('/forcar-troca-senha', {state: {email}});
        }, 200);
      }

      navigate('/dashboard');
    } catch {}
  }

  async function logout() {
    context.setPersistContext('auth', '');
    context.setPersistContext('permissoes', []);
    context.setPersistContext('sessionInfo', {});
    context.setPersistContext('estabelecimento', {});
    context.setPersistContext('layoutConfig', {});
    navigate('/login');
  }

  async function resetSenha(email: string, onSuccess?: () => void) {
    return await resetSenhaService.fetch({
      dynamicParams: {email},
      dynamicOnSuccess: onSuccess,
    });
  }

  return {
    login,
    logout,
    resetSenha,
  };
}
