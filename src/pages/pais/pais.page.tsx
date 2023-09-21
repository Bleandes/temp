import {PaisFormScreen} from './form-screen';
import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useLocation} from 'react-router-dom';
import {usePaisTableConfig} from './config';

function Pais() {
  const tableConfig = usePaisTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen title={'pais.startTitle'} includeButton={/*hasPermissaoById('/pais/create')*/ false} hideFooter>
      <AutoFetchTable route="/ListaPaginacaoPais" columns={tableConfig.generateConfig()} />
    </Screen>
  );
}

function PaisDetails() {
  const {
    state: {id},
  } = useLocation();
  return <PaisFormScreen type="details" title="pais.detailsTitle" id={id} />;
}

function PaisCreate() {
  return <PaisFormScreen type="create" title="pais.createTitle" />;
}

function PaisEdit() {
  const {
    state: {id},
  } = useLocation();
  return <PaisFormScreen type="edit" title="pais.editTitle" id={id} />;
}

export const routes = [
  {
    path: '/pais',
    element: () => <Pais />,
  },
  {
    path: '/pais/edit',
    element: () => <PaisEdit />,
  },
  {
    path: '/pais/details',
    element: () => <PaisDetails />,
  },
  {
    path: '/pais/create',
    element: () => <PaisCreate />,
  },
];
