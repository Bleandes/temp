import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useLocation} from 'react-router-dom';
import {useEstadoTableConfig} from './config';
import {EstadoScreenForm} from './form-screen';

function Estado() {
  const tableConfig = useEstadoTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen title="estado.startTitle" includeButton={/*hasPermissaoById('/estado/create')*/ false} hideFooter>
      <AutoFetchTable route="/ListaPaginacaoEstado" columns={tableConfig.generateStartConfig()} />
    </Screen>
  );
}

function EstadoCreate() {
  return <EstadoScreenForm type="create" title="estado.createTitle" />;
}

function EstadoEdit() {
  const {
    state: {id},
  } = useLocation();
  return <EstadoScreenForm type="edit" title="estado.editTitle" id={id} />;
}

function EstadoDetails() {
  const {
    state: {id},
  } = useLocation();
  return <EstadoScreenForm type="details" title="estado.detailsTitle" id={id} />;
}

export const routes = [
  {
    path: '/estado',
    element: () => <Estado />,
  },
  {
    path: '/estado/create',
    element: () => <EstadoCreate />,
  },
  {
    path: '/estado/edit',
    element: () => <EstadoEdit />,
  },
  {
    path: '/estado/details',
    element: () => <EstadoDetails />,
  },
];
