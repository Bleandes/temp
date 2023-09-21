import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useLocation} from 'react-router';
import {useFaltasEncomendasTableConfig} from './config';
import {FaltasEncomendasFormScreen} from './form-screen';

function FaltasEncomendas() {
  const tableConfig = useFaltasEncomendasTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen
      title={'faltasEncomendas.startTitle'}
      includeButton={hasPermissaoById('/faltas-encomendas/create')}
      hideFooter
    >
      <AutoFetchTable route="/ListaPaginacaoFaltasEncomendas" columns={tableConfig.generateStartConfig()} />
    </Screen>
  );
}

function FaltasEncomendasDetails() {
  const {
    state: {id},
  } = useLocation();
  return <FaltasEncomendasFormScreen type="details" title="faltasEncomendas.detailsTitle" id={id} />;
}

function FaltasEncomendasCreate() {
  return <FaltasEncomendasFormScreen type="create" title="faltasEncomendas.createTitle" />;
}

function FaltasEncomendasEdit() {
  const {
    state: {id},
  } = useLocation();
  return <FaltasEncomendasFormScreen type="edit" title="faltasEncomendas.editTitle" id={id} />;
}

export const routes = [
  {
    path: '/faltas-encomendas',
    element: () => <FaltasEncomendas />,
  },
  {
    path: '/faltas-encomendas/details',
    element: () => <FaltasEncomendasDetails />,
  },
  {
    path: '/faltas-encomendas/create',
    element: () => <FaltasEncomendasCreate />,
  },
  {
    path: '/faltas-encomendas/edit',
    element: () => <FaltasEncomendasEdit />,
  },
];
