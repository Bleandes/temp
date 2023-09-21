import {Screen} from '#components/screen';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useLocation} from 'react-router-dom';
import {useLaboratorioTableConfig} from './config';
import {LaboratorioFormScreen} from './form-screen';

function Laboratorio() {
  const tableConfig = useLaboratorioTableConfig();
  const {hasPermissaoById} = useHasPermissao();

  return (
    <Screen title={'laboratorio.startTitle'} includeButton={/*hasPermissaoById('/laboratorio/create')*/false} hideFooter>
      <AutoFetchTable route="/ListaPaginacaoLaboratorio" columns={tableConfig.generateConfig()} />
    </Screen>
  );
}

function LaboratorioDetails() {
  const {
    state: {id},
  } = useLocation();
  return <LaboratorioFormScreen type="details" title="laboratorio.detailsTitle" id={id} />;
}

function LaboratorioCreate() {
  return <LaboratorioFormScreen type="create" title="laboratorio.createTitle" />;
}

function LaboratorioEdit() {
  const {
    state: {id},
  } = useLocation();
  return <LaboratorioFormScreen type="edit" title="laboratorio.editTitle" id={id} />;
}

export const routes = [
  {
    path: '/laboratorio',
    element: () => <Laboratorio />,
  },
  {
    path: '/laboratorio/edit',
    element: () => <LaboratorioEdit />,
  },
  {
    path: '/laboratorio/details',
    element: () => <LaboratorioDetails />,
  },
  {
    path: '/laboratorio/create',
    element: () => <LaboratorioCreate />,
  },
];
