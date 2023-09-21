import {useApi} from '#hooks/use-api';
import {IFiltroContasPagas} from './types';

export function useRelatorioContasPagasModuleApi() {
  const relatorioContasPagasService = useApi('POST', '/RelatorioContasPagas');
  const relatorioContasPagasPorFornecedorService = useApi('POST', '/RelatorioContasPagasPorFornecedor');

  async function relatorioContasPagas(body: IFiltroContasPagas) {
    return await relatorioContasPagasService.fetch({
      dynamicParams: body,
    });
  }

  async function relatorioContasPagasPorFornecedor(body: IFiltroContasPagas) {
    return await relatorioContasPagasPorFornecedorService.fetch({
      dynamicParams: body,
    });
  }

  return {
    relatorioContasPagas,
    relatorioContasPagasPorFornecedor,
  };
}
