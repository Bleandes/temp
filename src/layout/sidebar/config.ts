import {useGlobalContext} from '#hooks/use-global-context';
import {IEstabelecimento} from '#pages/login/types';

type LayoutType = 'closed' | 'opened';

export function useEstabelecimentoConfig() {
  const context = useGlobalContext();
  const sessionInfo = context.getSessionInfo();
  const hasEstabelecimentos = checkHasEstabelecimentos();

  function checkHasEstabelecimentos() {
    if (sessionInfo.nivel >= 1) {
      if (sessionInfo.estabelecimentos && sessionInfo.estabelecimentos.length > 0) return true;
    } else {
      if (sessionInfo.acessoEstabelecimentos && sessionInfo.acessoEstabelecimentos.length > 0)
        return true;
    }

    return false;
  }

  function generateOptions(layoutType: LayoutType) {
    const options: {value: IEstabelecimento; label: string}[] = [];
    if (sessionInfo.nivel >= 1) {
      if (sessionInfo.estabelecimentos && sessionInfo.estabelecimentos.length > 0) {
        sessionInfo.estabelecimentos.forEach((element: IEstabelecimento) => {
          options.push({
            value: element,
            label:
              layoutType === 'opened' ? `${element.id} - ${element.nomeFantasia}` : `${element.id}`,
          });
        });
      }
    } else {
      if (sessionInfo.acessoEstabelecimentos && sessionInfo.acessoEstabelecimentos.length > 0) {
        sessionInfo.acessoEstabelecimentos.forEach((element: IEstabelecimento) => {
          options.push({
            value: element,
            label:
              layoutType === 'opened' ? `${element.id} - ${element.nomeFantasia}` : `${element.id}`,
          });
        });
      }
    }

    return options;
  }

  return {
    hasEstabelecimentos,
    generateOptions,
  };
}
