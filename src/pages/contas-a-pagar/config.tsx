import {useConfirmModal} from '#components/modal/confirm-modal';
import {useGlobalContext} from '#hooks/use-global-context';
import {useReload} from '#hooks/use-reload';
import {useTranslate} from '#hooks/use-translate';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {GridActionsCellItem, GridCellParams, GridPreProcessEditCellProps, GridRowParams} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import {useContasAPagarModuleApi} from './api';
import {useToast} from '#components/toast';
import {useHasPermissao} from '#hooks/use-has-permissao';
import moment from 'moment';
import {formatMoney, numberFormatterTwoDecimal} from '#helper/formatters';
import {IDuplicatasContasAPagar, IDuplicatasView} from './types';
import {TableDatePicker} from './components/date-picker';

export function useContasAPagarTableConfig() {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const currency = context.getPersistValue('currency');
  const {translate} = useTranslate();
  const confirmModal = useConfirmModal();
  const {triggerReload} = useReload();
  const api = useContasAPagarModuleApi();
  const toast = useToast();
  const {hasPermissaoById} = useHasPermissao();

  async function deleteOnClick(id: string) {
    return await api.excluirContasAPagar(id, () => {
      toast.showSuccessToast('global.success.delete');
      triggerReload();
    });
  }
  async function cancelOnClick(id: string) {
    return await api.cancelarConta(id, () => {
      toast.showSuccessToast('contasAPagar.cancel.success');
      triggerReload();
    });
  }

  function generateConfigContasAPagar() {
    return [
      {
        field: 'numeroFatura',
        headerName: translate('contasAPagar.start.documentNumber'),
        flex: 0.15,
      },
      {
        field: 'fornecedor',
        headerName: translate('global.supplier'),
        flex: 0.4,
        valueGetter: ({row}: any) => row.fornecedor.nomeFornecedor,
      },
      {
        field: 'dataVencimento',
        headerName: translate('global.dueDate'),
        flex: 0.15,
        valueFormatter: ({value}: any) => moment(value).format('DD/MM/YYYY'),
      },
      {
        field: 'valor',
        headerName: translate('global.value'),
        flex: 0.1,
        valueFormatter: ({value}: any) => `${currency} ${formatMoney(value)}`,
      },
      {
        field: 'actions',
        headerName: `${translate('global.actions')}`,
        flex: 0.2,
        type: 'actions',
        getActions: (params: GridRowParams<IDuplicatasView>) => [
          <>
            {hasPermissaoById('/contas-a-pagar/pay') && (
              <GridActionsCellItem
                label="Pagar"
                icon={<CheckCircleOutlineIcon />}
                onClick={() => navigate(`/contas-a-pagar/pay`, {state: {id: params.row.id}})}
                title={`${translate('global.pay')}`}
              />
            )}
          </>,
          <>
            {hasPermissaoById('/contas-a-pagar/details') && (
              <GridActionsCellItem
                label="Visualizar"
                icon={<VisibilityIcon />}
                onClick={() => navigate(`/contas-a-pagar/details`, {state: {id: params.row.id}})}
                title={`${translate('global.show')}`}
              />
            )}
          </>,
          <>
            {hasPermissaoById('/contas-a-pagar/edit') && (
              <GridActionsCellItem
                label="Editar"
                icon={<ModeEditIcon />}
                onClick={() => navigate(`/contas-a-pagar/edit`, {state: {id: params.row.id}})}
                title={`${translate('global.edit')}`}
              />
            )}
          </>,
          <>
            {hasPermissaoById('/contas-a-pagar/delete') && (
              <GridActionsCellItem
                label="Excluir"
                icon={<DeleteIcon />}
                onClick={() =>
                  confirmModal.show({
                    message: translate('global.confirmations.delete'),
                    onConfirm: () => deleteOnClick(params.row.id),
                  })
                }
                title={`${translate('global.delete')}`}
              />
            )}
          </>,
        ],
      },
    ];
  }

  function generateConfigContasPagas() {
    return [
      {
        field: 'numeroFatura',
        headerName: translate('contasAPagar.start.documentNumber'),
        flex: 0.15,
      },
      {
        field: 'fornecedor',
        headerName: translate('global.supplier'),
        flex: 0.4,
        valueGetter: ({row}: any) => row.fornecedor.nomeFornecedor,
      },
      {
        field: 'dataPagamento',
        headerName: translate('global.paymentDate'),
        flex: 0.15,
        valueFormatter: ({value}: any) => moment(value).format('DD/MM/YYYY'),
      },
      {
        field: 'valorPago',
        headerName: translate('global.payment'),
        flex: 0.1,
        valueFormatter: ({value}: any) => `${currency} ${formatMoney(value)}`,
      },
      {
        field: 'actions',
        headerName: `${translate('global.actions')}`,
        flex: 0.2,
        type: 'actions',
        getActions: (params: GridRowParams<IDuplicatasView>) => [
          <>
            {hasPermissaoById('/contas-a-pagar/cancel') && (
              <GridActionsCellItem
                label="CancelarPagamento"
                icon={<HighlightOffIcon />}
                onClick={() =>
                  confirmModal.show({
                    message: translate('contasAPagar.cancel.confirm'),
                    onConfirm: () => cancelOnClick(params.row.id),
                  })
                }
                title={`${translate('contasAPagar.cancel.title')}`}
              />
            )}
          </>,
          <>
            {hasPermissaoById('/contas-a-pagar/details') && (
              <GridActionsCellItem
                label="Visualizar"
                icon={<VisibilityIcon />}
                onClick={() =>
                  navigate(`/contas-a-pagar/details`, {
                    state: {
                      id: params.row.id,
                    },
                  })
                }
                title={`${translate('global.show')}`}
              />
            )}
          </>,
        ],
      },
    ];
  }

  function generateConfigDuplicatas(
    deleteFunction: () => void,
    duplicatas: IDuplicatasContasAPagar[],
    setDuplicatas: (duplicatas: IDuplicatasContasAPagar[]) => void,
    emissao: string,
  ) {
    return [
      {
        field: 'numeroFatura',
        headerName: translate('contasAPagar.duplicates.installmentNumber'),
        flex: 0.3,
        sortable: false,
        valueGetter: ({row}: any) => `${row.numeroFatura}.${row.id}`,
      },
      {
        field: 'dataVencimento',
        headerName: translate('contasAPagar.duplicates.dueDate'),
        flex: 0.3,
        sortable: false,
        renderCell: (params: GridCellParams) => (
          <TableDatePicker
            initialValue={duplicatas[parseFloat(params.row.id) - 1]}
            onChange={setDuplicatas}
            emissao={emissao}
            duplicatas={duplicatas}
          />
        ),
      },
      {
        field: 'valor',
        headerName: `${translate('global.value')} ${currency}`,
        flex: 0.2,
        sortable: false,
        editable: true,
        valueFormatter: ({value}: any) => `${currency} ${numberFormatterTwoDecimal.format(value)}`,
        type: 'number',
        align: 'left',
        headerAlign: 'left',
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const split = params.props.value.toString().split('.');
          const hasError = split[1] && split[1].length > 2;
          const finalValue = hasError ? params.row.valor : params.props.value;
          if (!hasError) {
            const newDuplicatas = [...duplicatas];
            newDuplicatas[parseFloat(params.id as string) - 1].valor = params.props.value;
            setDuplicatas(newDuplicatas);
          }
          return {value: parseFloat(finalValue)};
        },
      },
      {
        field: 'actions',
        headerName: `${translate('global.delete')}`,
        flex: 0.1,
        type: 'actions',
        getActions: () => [
          <GridActionsCellItem
            label="Excluir"
            icon={<DeleteIcon />}
            title={translate('global.delete')}
            onClick={deleteFunction}
          />,
        ],
      },
    ];
  }

  return {
    generateConfigContasAPagar,
    generateConfigContasPagas,
    generateConfigDuplicatas,
  };
}
