import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useLocation} from 'react-router';
import {useProdutoTableConfig} from './config';
import {ProdutoFormScreen} from './form-screen';

function Produto() {
  const tableConfig = useProdutoTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen title={'produto.startTitle'} includeButton={/*hasPermissaoById('/produto/create')*/ false} hideFooter>
      <AutoFetchTable route="/ListaPaginacaoProduto" columns={tableConfig.generateConfig()} />
    </Screen>
  );
}

function ProdutoDetails() {
  const {
    state: {id},
  } = useLocation();
  return <ProdutoFormScreen type="details" title="produto.detailsTitle" id={id} />;
}

function ProdutoCreate() {
  return <ProdutoFormScreen type="create" title="produto.createTitle" />;
}

function ProdutoEdit() {
  const {
    state: {id},
  } = useLocation();
  return <ProdutoFormScreen type="edit" title="produto.editTitle" id={id} />;
}

export const routes = [
  {
    path: '/produto',
    element: () => <Produto />,
  },
  {
    path: '/produto/details',
    element: () => <ProdutoDetails />,
  },
  {
    path: '/produto/create',
    element: () => <ProdutoCreate />,
  },
  {
    path: '/produto/edit',
    element: () => <ProdutoEdit />,
  },
];
