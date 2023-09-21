import {useTranslate} from '#hooks/use-translate';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {GridActionsCellItem, GridRowId, GridRowParams} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import {useFornecedorModuleApi} from './api';
import {useReload} from '#hooks/use-reload';
import {useConfirmModal} from '#components/modal/confirm-modal';
import {useToast} from '#components/toast';
import {useHasPermissao} from '#hooks/use-has-permissao';

export function useFornecedorTableConfig() {
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const api = useFornecedorModuleApi();
  const {triggerReload} = useReload();
  const confirmModal = useConfirmModal();
  const toast = useToast();
  const {hasPermissaoById} = useHasPermissao();

  async function deleteOnClick(id: GridRowId) {
    await api.excluirFornecedor(id.toString(), () => {
      triggerReload();
      toast.showSuccessToast('global.success.delete');
    });
  }

  function generateConfig() {
    return [
      {
        field: 'nomeFornecedor',
        headerName: `${translate('global.name')}`,
        flex: 0.8,
        sortable: true,
      },
      {
        field: 'actions',
        headerName: `${translate('global.actions')}`,
        flex: 0.2,
        type: 'actions',
        getActions: (params: GridRowParams) => [
          <>
            {hasPermissaoById('/fornecedor/details') && (
              <GridActionsCellItem
                label="Visualizar"
                icon={<VisibilityIcon />}
                onClick={() => navigate(`/fornecedor/details`, {state: {id: params.id}})}
                title={`${translate('global.show')}`}
              />
            )}
          </>,
          // <>
          //   {hasPermissaoById('/fornecedor/edit') && (
          //     <GridActionsCellItem
          //       label="Editar"
          //       icon={<ModeEditIcon />}
          //       onClick={() => navigate(`/fornecedor/edit`, {state: {id: params.id}})}
          //       title={`${translate('global.edit')}`}
          //     />
          //   )}
          // </>,
          // <>
          //   {hasPermissaoById('/fornecedor/delete') && (
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
