import {useConfirmModal} from '#components/modal/confirm-modal';
import {useReload} from '#hooks/use-reload';
import {useTranslate} from '#hooks/use-translate';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {GridActionsCellItem, GridRowId, GridRowParams} from '@mui/x-data-grid-pro';
import {useNavigate, useLocation} from 'react-router-dom';
import {useUnidadeModuleApi} from './api';
import {useToast} from '#components/toast';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {getTipoUnidadeString} from '#helper/enum-mapper/enum-mapper';
import {GridCellParams} from '@mui/x-data-grid-pro';
import {TableCellTextInput} from '#components/tables/table-cells/text-input';
import {IUnidadeConversao} from './types';

export function useUnidadeTableConfig() {
  const pathDetails = location.pathname.includes('details');
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const confirmModal = useConfirmModal();
  const {triggerReload} = useReload();
  const api = useUnidadeModuleApi();
  const toast = useToast();
  const {hasPermissaoById} = useHasPermissao();

  async function deleteOnClick(id: GridRowId) {
    await api.excluirUnidade(id.toString(), () => {
      triggerReload();
      toast.showSuccessToast('global.success.delete');
    });
  }

  function generateConfig() {
    return [
      {
        field: 'sigla',
        headerName: `${translate('global.acronym')}`,
        flex: 0.2,
      },
      {
        field: 'descricao',
        headerName: `${translate('global.description')}`,
        flex: 0.2,
      },
      {
        field: 'tipo',
        headerName: `${translate('global.type')}`,
        flex: 0.2,
        valueGetter: ({row}: any) => {
          return translate(getTipoUnidadeString(row.tipo));
        },
      },
      {
        field: 'fator',
        headerName: `${translate('global.factor')}`,
        flex: 0.2,
        valueGetter: ({row}: any) => {
          if (!row.fator) return '';
          if (row.fator && row.fator === '') return '';
          const splited = row.fator.split('.');
          return `${splited[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
        },
      },
      {
        field: 'actions',
        headerName: `${translate('global.actions')}`,
        flex: 0.2,
        type: 'actions',
        getActions: (params: GridRowParams) => [
          <>
            {hasPermissaoById('/unidade/details') && (
              <GridActionsCellItem
                label="Visualizar"
                icon={<VisibilityIcon />}
                onClick={() => navigate(`/unidade/details`, {state: {id: params.id}})}
                title={`${translate('global.show')}`}
              />
            )}
          </>,
          <>
            {hasPermissaoById('/unidade/edit') && (
              <GridActionsCellItem
                label="Editar"
                icon={<ModeEditIcon />}
                onClick={() => navigate(`/unidade/edit`, {state: {id: params.id}})}
                title={`${translate('global.edit')}`}
              />
            )}
          </>,
          <>
            {hasPermissaoById('/unidade/delete') && (
              <GridActionsCellItem
                label="Excluir"
                icon={<DeleteIcon />}
                onClick={() =>
                  confirmModal.show({
                    message: translate('global.confirmations.delete'),
                    onConfirm: () => deleteOnClick(params.id),
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

  function generateConfigLeftTable() {
    return [
      {
        field: 'sigla',
        headerName: `${translate('global.acronym')}`,
        flex: 0.4,
        valueGetter: ({row}: any) => row.sigla,
      },
      {
        field: 'descricao',
        headerName: `${translate('global.description')}`,
        flex: 0.6,
        valueGetter: ({row}: any) => row.descricao,
      },
    ];
  }

  function generateConfigRightTable(changeItem: (value: Partial<IUnidadeConversao>) => void) {
    return [
      {
        field: 'sigla',
        headerName: `${translate('global.acronym')}`,
        flex: 0.2,
        valueGetter: ({row}: any) => row.sigla,
      },
      {
        field: 'descricao',
        headerName: `${translate('global.description')}`,
        flex: 0.4,
        valueGetter: ({row}: any) => row.descricao,
      },
      {
        field: 'fator',
        headerName: `${translate('global.factor')}`,
        flex: 0.2,
        ...(pathDetails
          ? {valueGetter: ({row}: any) => row.fator}
          : {
              renderCell: (params: GridCellParams) => (
                <TableCellTextInput
                  value={params.row.fator}
                  onChange={(value) => {
                    let copy = {...params.row};
                    copy.fator = value;
                    changeItem(copy);
                  }}
                  numberFormatterInfinityDecimal
                />
              ),
            }),
      },
    ];
  }

  return {
    generateConfig,
    generateConfigLeftTable,
    generateConfigRightTable,
  };
}
