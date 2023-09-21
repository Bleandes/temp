import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useLocation} from 'react-router';
import {useFornecedorTableConfig} from './config';
import {FornecedorFormScreen} from './form-screen';

function Fornecedor() {
  const tableConfig = useFornecedorTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen title={'fornecedor.startTitle'} includeButton={/*hasPermissaoById('/fornecedor/create')*/ false} hideFooter>
      <AutoFetchTable route="/ListaPaginacaoFornecedor" columns={tableConfig.generateConfig()} />
    </Screen>
  );
}

function FornecedorDetails() {
  const {
    state: {id},
  } = useLocation();
  return <FornecedorFormScreen type="details" title="fornecedor.detailsTitle" id={id} />;
}

function FornecedorCreate() {
  return <FornecedorFormScreen type="create" title="fornecedor.createTitle" />;
}

function FornecedorEdit() {
  const {
    state: {id},
  } = useLocation();
  return <FornecedorFormScreen type="edit" title="fornecedor.editTitle" id={id} />;
}

export const routes = [
  {
    path: '/fornecedor',
    element: () => <Fornecedor />,
  },
  {
    path: '/fornecedor/details',
    element: () => <FornecedorDetails />,
  },
  {
    path: '/fornecedor/create',
    element: () => <FornecedorCreate />,
  },
  {
    path: '/fornecedor/edit',
    element: () => <FornecedorEdit />,
  },
];
