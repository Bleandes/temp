import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {GridActionsCellItem, GridRowId, GridRowParams} from '@mui/x-data-grid';
import {useConfirmModal} from '#components/modal/confirm-modal';
import {useToast} from '#components/toast';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useReload} from '#hooks/use-reload';
import {useTranslate} from '#hooks/use-translate';
import {useNavigate} from 'react-router-dom';
import {usePaisModuleApi} from './api';
import {IPais} from './types';

export function usePaisTableConfig() {
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const confirmModal = useConfirmModal();
  const {triggerReload} = useReload();
  const api = usePaisModuleApi();
  const toast = useToast();
  const {hasPermissaoById} = useHasPermissao();

  async function deleteOnClick(id: GridRowId) {
    await api.excluirPais(id.toString(), () => {
      triggerReload();
      toast.showSuccessToast('global.success.delete');
    });
  }

  function generateConfig() {
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
        getActions: (params: GridRowParams<IPais>) => [
          <>
            {hasPermissaoById('/pais/details') && (
              <GridActionsCellItem
                label="Visualizar"
                icon={<VisibilityIcon />}
                onClick={() => navigate(`/pais/details`, {state: {id: params.id}})}
                title={`${translate('global.show')}`}
              />
            )}
          </>,
          // <>
          //   {hasPermissaoById('/pais/edit') && (
          //     <GridActionsCellItem
          //       label="Editar"
          //       icon={<ModeEditIcon />}
          //       onClick={() => navigate(`/pais/edit`, {state: {id: params.id}})}
          //       title={`${translate('global.edit')}`}
          //     />
          //   )}
          // </>,
          // <>
          //   {hasPermissaoById('/pais/delete') && (
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

  return {
    generateConfig,
  };
}
