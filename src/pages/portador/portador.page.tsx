import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useLocation} from 'react-router';
import {usePortadorTableConfig} from './config';
import {PortadorFormScreen} from './form-screen';

function Portador() {
  const tableConfig = usePortadorTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen title={'portador.startTitle'} includeButton={/*hasPermissaoById('/portador/create')*/ false} hideFooter>
      <AutoFetchTable route="/ListaPaginacaoPortador" columns={tableConfig.generateConfig()} />
    </Screen>
  );
}

function PortadorDetails() {
  const {
    state: {id},
  } = useLocation();
  return <PortadorFormScreen type="details" title="portador.detailsTitle" id={id} />;
}

function PortadorCreate() {
  return <PortadorFormScreen type="create" title="portador.createTitle" />;
}

function PortadorEdit() {
  const {
    state: {id},
  } = useLocation();
  return <PortadorFormScreen type="edit" title="portador.editTitle" id={id} />;
}

export const routes = [
  {
    path: '/portador',
    element: () => <Portador />,
  },
  {
    path: '/portador/details',
    element: () => <PortadorDetails />,
  },
  {
    path: '/portador/create',
    element: () => <PortadorCreate />,
  },
  {
    path: '/portador/edit',
    element: () => <PortadorEdit />,
  },
];
