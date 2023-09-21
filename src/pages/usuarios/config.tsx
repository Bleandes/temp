import {useToast} from '#components/toast';
import {useHasPermissao} from '#hooks/use-has-permissao';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {GridActionsCellItem, GridRowId, GridRowParams} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import {useUsuarioModuleApi} from './api';
import {useReload} from '#hooks/use-reload';
import {useConfirmModal} from '#components/modal/confirm-modal';
import {useTranslate} from '#hooks/use-translate';

export function useProdutoTableConfig() {
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const confirmModal = useConfirmModal();
  const {triggerReload} = useReload();
  const api = useUsuarioModuleApi();
  const toast = useToast();
  const {hasPermissaoById} = useHasPermissao();

  async function deleteOnClick(id: GridRowId) {
    await api.excluirUsuario(id.toString(), () => {
      triggerReload();
      toast.showSuccessToast('global.success.delete');
    });
  }

  function generateConfig() {
    return [
      {
        field: 'email',
        headerName: `${translate('global.email')}`,
        flex: 0.2,
      },
      {
        field: 'nomeAbreviado',
        headerName: `${translate('global.name')}`,
        flex: 0.3,
      },
      {
        field: 'nomeGrupoUsuario',
        headerName: `${translate('usuarios.grupoUsuario')}`,
        flex: 0.3,
      },
      {
        field: 'actions',
        headerName: `${translate('global.actions')}`,
        flex: 0.2,
        type: 'actions',
        getActions: (params: GridRowParams) => [
          <>
            {hasPermissaoById('/usuarios/details') && (
              <GridActionsCellItem
                label="Visualizar"
                icon={<VisibilityIcon />}
                onClick={() => navigate(`/usuarios/details`, {state: {id: params.id}})}
                title={`${translate('global.show')}`}
              />
            )}
          </>,
            <>
              {hasPermissaoById('/usuarios/edit') && (
                <GridActionsCellItem
                  label="Editar"
                  icon={<ModeEditIcon />}
                  onClick={() => navigate(`/usuarios/edit`, {state: {id: params.id}})}
                  title={`${translate('global.edit')}`}
                />
              )}
            </>,
            <>
              {hasPermissaoById('/usuarios/delete') && (
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

  return {
    generateConfig,
  };
}
