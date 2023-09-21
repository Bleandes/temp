import {useToast} from '#components/toast';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useReload} from '#hooks/use-reload';
import {useTranslate} from '#hooks/use-translate';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {GridActionsCellItem, GridRowId, GridRowParams} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import {useEstadoModuleApi} from './api';
import {useConfirmModal} from '#components/modal/confirm-modal';
import {IEstado} from './types';

export function useEstadoTableConfig() {
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const {hasPermissaoById} = useHasPermissao();
  const toast = useToast();
  const {triggerReload} = useReload();
  const api = useEstadoModuleApi();
  const confirmModal = useConfirmModal();

  async function deleteOnClick(id: GridRowId) {
    await api.excluirEstado(id.toString(), () => {
      triggerReload();
      toast.showSuccessToast('global.success.delete');
    });
  }

  function generateStartConfig() {
    return [
      {
        field: 'nome',
        headerName: `${translate('global.name')}`,
        flex: 0.8,
      },
      {
        field: 'actions',
        headerName: `${translate('global.actions')}`,
        flex: 0.2,
        type: 'actions',
        getActions: (params: GridRowParams<IEstado>) => [
          <>
            {hasPermissaoById('/estado/details') && (
              <GridActionsCellItem
                label="Visualizar"
                icon={<VisibilityIcon />}
                onClick={() => navigate(`/estado/details`, {state: {id: params.id}})}
                title={`${translate('global.show')}`}
              />
            )}
          </>,
          // <>
          //   {hasPermissaoById('/estado/edit') && (
          //     <GridActionsCellItem
          //       label="Editar"
          //       icon={<ModeEditIcon />}
          //       onClick={() => navigate(`/estado/edit`, {state: {id: params.id}})}
          //       title={`${translate('global.edit')}`}
          //     />
          //   )}
          // </>,
          // <>
          //   {hasPermissaoById('/estado/delete') && (
          //     <GridActionsCellItem
          //       label="Excluir"
          //       icon={<DeleteIcon />}
          //       onClick={() =>
          //         confirmModal.show({
          //           message: translate('global.confirmations.delete'),
          //           onConfirm: () => deleteOnClick(params.id),
          //         })
          //       }
          //       title={`${translate('global.delete')}`}
          //     />
          //   )}
          // </>,
        ],
      },
    ];
  }

  function generateDetailsConfig() {
    return [
      {
        field: 'siglaEstadoOrigem',
        headerName: `${translate('global.acronym')}`,
        flex: 0.1,
      },
      {
        field: 'nomeEstadoOrigem',
        headerName: `${translate('estado.aliquotaEstado.estadoOrigem')}`,
        flex: 0.2,
      },
      {
        field: 'siglaEstadoDestino',
        headerName: `${translate('global.acronym')}`,
        flex: 0.1,
      },
      {
        field: 'nomeEstadoDestino',
        headerName: `${translate('estado.aliquotaEstado.estadoDestino')}`,
        flex: 0.2,
      },
      {
        field: 'porcentagemIcms',
        headerName: `${translate('estado.aliquotaEstado.porcentagemIcms')}`,
        flex: 0.2,
        valueGetter: (params: any) => params.row.porcentagemIcms?.toLocaleString('pt-BR'),
      },
    ];
  }

  return {
    generateStartConfig,
    generateDetailsConfig,
  };
}
