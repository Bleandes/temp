import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {GridActionsCellItem, GridRowId, GridRowParams} from '@mui/x-data-grid';
import {useConfirmModal} from '#components/modal/confirm-modal';
import {useToast} from '#components/toast';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useReload} from '#hooks/use-reload';
import {useTranslate} from '#hooks/use-translate';
import {useCidadeModuleApi} from './api';
import {ICidade} from './types';
import {useNavigate} from 'react-router-dom';

export function useCidadeTableConfig() {
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const api = useCidadeModuleApi();
  const confirmModal = useConfirmModal();
  const toast = useToast();
  const {triggerReload} = useReload();
  const {hasPermissaoById} = useHasPermissao();

  async function deleteOnClick(id: GridRowId) {
    await api.excluirCidade(id.toString(), () => {
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
        getActions: (params: GridRowParams<ICidade>) => [
          <>
            {hasPermissaoById('/cidade/details') && (
              <GridActionsCellItem
                label="Visualizar"
                icon={<VisibilityIcon />}
                onClick={() => navigate(`/cidade/details`, {state: {id: params.id}})}
                title={`${translate('global.show')}`}
              />
            )}
          </>,
          // <>
          //   {hasPermissaoById('/cidade/edit') && (
          //     <GridActionsCellItem
          //       label="Editar"
          //       icon={<ModeEditIcon />}
          //       onClick={() => navigate(`/cidade/edit`, {state: {id: params.id}})}
          //       title={`${translate('global.edit')}`}
          //     />
          //   )}
          // </>,
          // <>
          //   {hasPermissaoById('/cidade/delete') && (
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
