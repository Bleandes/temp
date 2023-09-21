import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useLocation} from 'react-router';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useUnidadeTableConfig} from './config';
import {UnidadeFormScreen} from './form-screen';

function Unidade() {
  const tableConfig = useUnidadeTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen title={'unidade.startTitle'} includeButton={hasPermissaoById('/unidade/create')} hideFooter>
      <AutoFetchTable route="/ListaPaginacaoUnidade" columns={tableConfig.generateConfig()} />
    </Screen>
  );
}

function UnidadeDetails() {
  const {
    state: {id},
  } = useLocation();
  return <UnidadeFormScreen type="details" title="unidade.detailsTitle" id={id} />;
}

function UnidadeCreate() {
  return <UnidadeFormScreen type="create" title="unidade.createTitle" />;
}

function UnidadeEdit() {
  const {
    state: {id},
  } = useLocation();
  return <UnidadeFormScreen type="edit" title="unidade.editTitle" id={id} />;
}

export const routes = [
  {
    path: '/unidade',
    element: () => <Unidade />,
  },
  {
    path: '/unidade/details',
    element: () => <UnidadeDetails />,
  },
  {
    path: '/unidade/create',
    element: () => <UnidadeCreate />,
  },
  {
    path: '/unidade/edit',
    element: () => <UnidadeEdit />,
  },
];
