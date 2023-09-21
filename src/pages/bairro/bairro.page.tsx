import {BairroFormScreen} from './form-screen';
import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useBairroTableConfig} from './config';
import {useLocation} from 'react-router-dom';

function Bairro() {
  const tableConfig = useBairroTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen
      title={'bairro.startTitle'}
      includeButton={/*hasPermissaoById('/bairro/create')*/ false}
      hideFooter
    >
      <AutoFetchTable route="/ListaPaginacaoBairro" columns={tableConfig.generateConfig()} />
    </Screen>
  );
}

function BairroDetails() {
  const {
    state: {id},
  } = useLocation();
  return <BairroFormScreen type="details" title="bairro.detailsTitle" id={id} />;
}

function BairroCreate() {
  return <BairroFormScreen type="create" title="bairro.createTitle" />;
}

function BairroEdit() {
  const {
    state: {id},
  } = useLocation();
  return <BairroFormScreen type="edit" title="bairro.editTitle" id={id} />;
}

export const routes = [
  {
    path: '/bairro',
    element: () => <Bairro />,
  },
  {
    path: '/bairro/edit',
    element: () => <BairroEdit />,
  },
  {
    path: '/bairro/details',
    element: () => <BairroDetails />,
  },
  {
    path: '/bairro/create',
    element: () => <BairroCreate />,
  },
];
