import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useLocation} from 'react-router-dom';
import {useBancoTableConfig} from './config';
import {BancoFormScreen} from './form-screen';

function Banco() {
  const tableConfig = useBancoTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen
      title={'banco.startTitle'}
      includeButton={/*hasPermissaoById('/banco/create')*/ false}
      hideFooter
    >
      <AutoFetchTable route="/ListaPaginacaoBanco" columns={tableConfig.generateConfig()} />
    </Screen>
  );
}

function BancoDetails() {
  const {
    state: {id},
  } = useLocation();
  return <BancoFormScreen type="details" title="banco.detailsTitle" id={id} />;
}

function BancoCreate() {
  return <BancoFormScreen type="create" title="banco.createTitle" />;
}

function BancoEdit() {
  const {
    state: {id},
  } = useLocation();
  return <BancoFormScreen type="edit" title="banco.editTitle" id={id} />;
}

export const routes = [
  {
    path: '/banco',
    element: () => <Banco />,
  },
  {
    path: '/banco/details',
    element: () => <BancoDetails />,
  },
  {
    path: '/banco/create',
    element: () => <BancoCreate />,
  },
  {
    path: '/banco/edit',
    element: () => <BancoEdit />,
  },
];
