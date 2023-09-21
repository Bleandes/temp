import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useLocation} from 'react-router';
import {useGrupoTableConfig} from './config';
import {GrupoFormScreen} from './from-screen';

function Grupo() {
  const tableConfig = useGrupoTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen title={'grupo.startTitle'} includeButton={/*hasPermissaoById('/grupo/create')*/ false} hideFooter>
      <AutoFetchTable route="/ListaPaginacaoGrupo" columns={tableConfig.generateConfig()} />
    </Screen>
  );
}

function GrupoDetails() {
  const {
    state: {id},
  } = useLocation();
  return <GrupoFormScreen type="details" title="grupo.detailsTitle" id={id} />;
}

function GrupoCreate() {
  return <GrupoFormScreen type="create" title="grupo.createTitle" />;
}

function GrupoEdit() {
  const {
    state: {id},
  } = useLocation();
  return <GrupoFormScreen type="edit" title="grupo.editTitle" id={id} />;
}

export const routes = [
  {
    path: '/grupo',
    element: () => <Grupo />,
  },
  {
    path: '/grupo/details',
    element: () => <GrupoDetails />,
  },
  {
    path: '/grupo/create',
    element: () => <GrupoCreate />,
  },
  {
    path: '/grupo/edit',
    element: () => <GrupoEdit />,
  },
];
