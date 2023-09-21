import {useApi} from '#hooks/use-api';
import {IFiltroContasAPagar, IPlanoDeConta} from './types';

export function useRelatorioContasAPagarModuleApi() {
  const listaPlanoDeContasService = useApi<IPlanoDeConta[]>('GET', '/ListaPlanoDeContas');
  const relatorioContasAPagarPorPlanoDeContasService = useApi('POST', '/RelatorioContasAPagarPorPlanoDeContas');
  const relatorioContasAPagarPorFornecedorService = useApi('POST', '/RelatorioContasAPagarPorFornecedor');

  async function relatorioContasAPagarPorPlanoDeContas(body: IFiltroContasAPagar) {
    return await relatorioContasAPagarPorPlanoDeContasService.fetch({
      dynamicParams: body,
    });
  }

  async function relatorioContasAPagarPorFornecedor(body: IFiltroContasAPagar) {
    return await relatorioContasAPagarPorFornecedorService.fetch({
      dynamicParams: body,
    });
  }

  return {
    relatorioContasAPagarPorPlanoDeContas,
    relatorioContasAPagarPorFornecedor,
    listaPlanoDeContas: () => listaPlanoDeContasService.fetch(),
  };
}
