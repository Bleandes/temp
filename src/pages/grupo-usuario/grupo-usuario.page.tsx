import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useGrupoUsuarioTableConfig} from './config';

function GrupoUsuarioStart() {
  const tableConfig = useGrupoUsuarioTableConfig();
  const {isAdmin} = useHasPermissao();

  return (
    <Screen title="grupoUsuarios.startTitle" includeButton={isAdmin()} hideFooter>
      <AutoFetchTable route="/ListaPaginacaoGrupoUsuario" columns={tableConfig.generateConfig()} />
    </Screen>
  );
}

export const routes = [
  {
    path: '/grupo-usuarios',
    element: () => <GrupoUsuarioStart />,
  },
];
