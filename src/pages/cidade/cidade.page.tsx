import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useLocation} from 'react-router-dom';
import {useCidadeTableConfig} from './config';
import {CidadeFormScreen} from './form-screen';

function CidadeStart() {
  const tableConfig = useCidadeTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen
      title={'cidade.startTitle'}
      includeButton={/*hasPermissaoById('/cidade/create')*/ false}
      hideFooter
    >
      <AutoFetchTable route="/ListaPaginacaoCidade" columns={tableConfig.generateConfig()} />
    </Screen>
  );
}

function CidadeDetails() {
  const {
    state: {id},
  } = useLocation();
  return <CidadeFormScreen type="details" title="cidade.detailsTitle" id={id} />;
}

function CidadeCreate() {
  return <CidadeFormScreen type="create" title="cidade.createTitle" />;
}

function CidadeEdit() {
  const {
    state: {id},
  } = useLocation();
  return <CidadeFormScreen type="edit" title="cidade.editTitle" id={id} />;
}

export const routes = [
  {
    path: '/cidade',
    element: () => <CidadeStart />,
  },
  {
    path: '/cidade/create',
    element: () => <CidadeCreate />,
  },
  {
    path: '/cidade/edit',
    element: () => <CidadeEdit />,
  },
  {
    path: '/cidade/details',
    element: () => <CidadeDetails />,
  },
];
