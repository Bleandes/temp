import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useLocation} from 'react-router';
import {useProdutoTableConfig} from './config';
import {UsuarioFormScreen} from './form-screen';

function Usuario() {
  const tableConfig = useProdutoTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen title={'usuarios.startTitle'} includeButton={hasPermissaoById('/usuarios/create')} hideFooter>
      <AutoFetchTable route="/ListaPaginacaoUsuario" columns={tableConfig.generateConfig()} />
    </Screen>
  );
}

function UsuarioDetails() {
  const {
    state: {id},
  } = useLocation();
  return <UsuarioFormScreen type="details" title="usuarios.detailsTitle" id={id} />;
}

function UsuarioCreate() {
  return <UsuarioFormScreen type="create" title="usuarios.createTitle" />;
}

function UsuarioEdit() {
  const {
    state: {id},
  } = useLocation();
  return <UsuarioFormScreen type="edit" title="usuarios.editTitle" id={id} />;
}

export const routes = [
  {
    path: '/usuarios',
    element: () => <Usuario />,
  },
  {
    path: '/usuarios/details',
    element: () => <UsuarioDetails />,
  },
  {
    path: '/usuarios/create',
    element: () => <UsuarioCreate />,
  },
  {
    path: '/usuarios/edit',
    element: () => <UsuarioEdit />,
  },
];
