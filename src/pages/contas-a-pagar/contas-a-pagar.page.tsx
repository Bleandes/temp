import {useGlobalContext} from '#hooks/use-global-context';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useTranslate} from '#hooks/use-translate';
import {useState} from 'react';
import {useContasAPagarTableConfig} from './config';
import {Toggle} from '#components/toggle';
import * as S from './styles';
import {AutoFetchTable} from '#components/tables/auto-fetch-table';
import {Screen} from '#components/screen';
import {ContasAPagarFormScreen} from './form-screen';
import {useLocation} from 'react-router';

function ContasAPagarStart() {
  const context = useGlobalContext();
  const [toggle, setToggle] = useState(!!context.getPersistValue('contasAPagarToggle'));
  const {translate} = useTranslate();
  const {hasPermissaoById} = useHasPermissao();
  const config = useContasAPagarTableConfig();

  function renderToggle() {
    return (
      <S.StyledRow>
        <S.StyledInternalRow>
          <Toggle
            value={context.getPersistValue('contasAPagarToggle') ?? false}
            onChange={() => {
              setToggle(!toggle);
              context.setPersistContext('contasAPagarToggle', !toggle);
            }}
          />
          <S.StyledText>{translate('contasAPagar.start.paidDuplicated')}</S.StyledText>
        </S.StyledInternalRow>
      </S.StyledRow>
    );
  }

  return (
    <Screen
      title="contasAPagar.startTitle"
      renderAfterTitle={renderToggle}
      includeButton={hasPermissaoById('/contas-a-pagar/create')}
      hideFooter
    >
      <AutoFetchTable
        tableName={toggle ? 'autoFetchTableConfig_contasPagas' : 'autoFetchTableConfig_contasAPagar'}
        route="/ListaPaginacaoContasAPagar"
        columns={toggle ? config.generateConfigContasPagas() : config.generateConfigContasAPagar()}
        extraParams={{pagas: toggle}}
      />
    </Screen>
  );
}

function ContasAPagarCreate() {
  return <ContasAPagarFormScreen type="create" title="contasAPagar.createTitle" />;
}

function ContasAPagarDetails() {
  const {
    state: {id},
  } = useLocation();
  return <ContasAPagarFormScreen type="details" title="contasAPagar.detailsTitle" id={id} />;
}

function ContasAPagarEdit() {
  const {
    state: {id},
  } = useLocation();
  return <ContasAPagarFormScreen type="edit" title="contasAPagar.editTitle" id={id} />;
}

function ContasAPagarPay() {
  const {
    state: {id},
  } = useLocation();
  return <ContasAPagarFormScreen type="pay" title="contasAPagar.payTitle" id={id} />;
}

export const routes = [
  {
    path: '/contas-a-pagar',
    element: () => <ContasAPagarStart />,
  },
  {
    path: '/contas-a-pagar/create',
    element: () => <ContasAPagarCreate />,
  },
  {
    path: '/contas-a-pagar/details',
    element: () => <ContasAPagarDetails />,
  },
  {
    path: '/contas-a-pagar/edit',
    element: () => <ContasAPagarEdit />,
  },
  {
    path: '/contas-a-pagar/pay',
    element: () => <ContasAPagarPay />,
  },
];
