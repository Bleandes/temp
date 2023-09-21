import {useTranslate} from '#hooks/use-translate';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {GridActionsCellItem, GridCellParams, GridRowId, GridRowParams} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import {useFaltasEncomendasApi} from './api';
import {useReload} from '#hooks/use-reload';
import {useConfirmModal} from '#components/modal/confirm-modal';
import {useToast} from '#components/toast';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {TableCellTextInput} from '#components/tables/table-cells/text-input';
import {IFaltasEncomendas} from './types';

export function useFaltasEncomendasTableConfig() {
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const api = useFaltasEncomendasApi();
  const {triggerReload} = useReload();
  const confirmModal = useConfirmModal();
  const toast = useToast();
  const {hasPermissaoById} = useHasPermissao();

  async function deleteOnClick(id: GridRowId) {
    await api.excluirFaltasEncomendas(id.toString(), () => {
      triggerReload();
      toast.showSuccessToast('global.success.delete');
    });
  }

  async function updateOnClick(id: GridRowId) {
    await api.concluirFaltasEncomendas(id.toString(), () => {
      triggerReload();
      toast.showSuccessToast('faltasEncomendas.success.concluir');
    });
  }

  function concluirFaltaEncomenda(params: GridRowParams) {
    if (hasPermissaoById('/faltas-encomendas/concluir')) {
      return (
        <GridActionsCellItem
          label={translate('faltasEncomendas.concluir')}
          icon={<CheckCircleOutlineIcon />}
          onClick={() => {
            if (params.row.status === 2) {
              toast.showErrorToast('faltasEncomendas.erros.faltaEncomendaJaConcluida');
              return;
            }
            confirmModal.show({
              message: translate('faltasEncomendas.confirmations.concluir'),
              onConfirm: () => updateOnClick(params.id),
            });
          }}
          title={translate('faltasEncomendas.concluir')}
          showInMenu
        />
      );
    }
    return <></>;
  }

  function generateStartConfig() {
    return [
      {
        field: 'tipo',
        headerName: translate('global.type'),
        flex: 0.1,
        valueGetter: (params: any) =>
          params.row.tipo == 0
            ? translate('faltasEncomendas.radioButtonOptions.falta')
            : translate('faltasEncomendas.radioButtonOptions.encomenda'),
      },
      {
        field: 'produto',
        headerName: translate('global.product'),
        flex: 0.4,
        valueGetter: (params: any) => (params.row.produto ? params.row.produto.descricao : ''),
      },
      {
        field: 'vendedor',
        headerName: translate('global.seller'),
        flex: 0.2,
        valueGetter: (params: any) => (params.row.vendedor ? params.row.vendedor.nome : ''),
      },
      {
        field: 'status',
        headerName: translate('global.status'),
        flex: 0.1,
        valueGetter: (params: any) =>
          params.row.status == 0
            ? translate('faltasEncomendas.statusFaltaEncomenda.solicitado')
            : params.row.status == 1
            ? translate('faltasEncomendas.statusFaltaEncomenda.encomendado')
            : translate('faltasEncomendas.statusFaltaEncomenda.concluido'),
      },
      {
        field: 'actions',
        headerName: translate('global.actions'),
        flex: 0.2,
        type: 'actions',
        getActions: (params: GridRowParams) => [
          <>
            {hasPermissaoById('/faltas-encomendas/create') && (
              <GridActionsCellItem
                label="Visualizar"
                icon={<VisibilityIcon />}
                onClick={() => navigate(`/faltas-encomendas/details`, {state: {id: params.id}})}
                title={translate('global.show')}
              />
            )}
          </>,
          <>
            {hasPermissaoById('/faltas-encomendas/edit') && (
              <GridActionsCellItem
                label="Editar"
                icon={<ModeEditIcon />}
                onClick={() => navigate(`/faltas-encomendas/edit`, {state: {id: params.id}})}
                title={translate('global.edit')}
              />
            )}
          </>,
          <>
            {hasPermissaoById('/faltas-encomendas/delete') && (
              <GridActionsCellItem
                label="Excluir"
                icon={<DeleteIcon />}
                onClick={() =>
                  confirmModal.show({
                    message: translate('global.confirmations.delete'),
                    onConfirm: () => deleteOnClick(params.id),
                  })
                }
                title={translate('global.delete')}
              />
            )}
          </>,
          concluirFaltaEncomenda(params),
        ],
      },
    ];
  }

  function generateCreateConfig(
    deleteItem: (value: Partial<IFaltasEncomendas>) => void,
    changeItem: (value: Partial<IFaltasEncomendas>) => void,
  ) {
    return [
      {
        field: 'grupo',
        headerName: `${translate('global.group')}`,
        flex: 0.2,
        valueGetter: ({row}: any) => row.nomeGrupo,
      },
      {
        field: 'produto',
        headerName: `${translate('global.product')}`,
        flex: 0.4,
        valueGetter: ({row}: any) => row.descricaoProduto,
      },
      {
        field: 'quantidade',
        headerName: `${translate('global.quantity')}`,
        flex: 0.2,
        renderCell: (params: GridCellParams) => (
          <TableCellTextInput
            value={params.row.quantidade}
            onChange={(value) => {
              let copy = {...params.row};
              copy.quantidade = value;
              changeItem(copy);
            }}
            numberFormatterInfinityDecimal
          />
        ),
      },
      {
        field: 'unidade',
        headerName: `${translate('global.unity')}`,
        flex: 0.4,
        valueGetter: ({row}: any) => row.unidadeEstoque,
      },
      {
        field: 'actions',
        headerName: `${translate('global.actions')}`,
        flex: 0.2,
        type: 'actions',
        getActions: (params: GridRowParams<Partial<IFaltasEncomendas>>) => [
          <GridActionsCellItem
            label="Excluir"
            icon={<DeleteIcon />}
            onClick={() => deleteItem(params.row)}
            title={`${translate('global.delete')}`}
          />,
        ],
      },
    ];
  }

  return {
    generateStartConfig,
    generateCreateConfig,
  };
}
