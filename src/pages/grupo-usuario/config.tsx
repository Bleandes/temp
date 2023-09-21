import {useNavigate} from 'react-router';
import {IGrupoUsuario, IPermissao} from './types';
import {useTranslate} from '#hooks/use-translate';
import {useConfirmModal} from '#components/modal/confirm-modal';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useGrupoUsuarioModuleApi} from './api';
import {useToast} from '#components/toast';
import {useReload} from '#hooks/use-reload';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {GridActionsCellItem, GridRowId, GridRowParams} from '@mui/x-data-grid';

const orderPriority = ['Listar', 'Visualizar', 'Adicionar', 'Editar', 'Excluir'];

export const orderConfig = (a: IPermissao, b: IPermissao) => {
  const aIndex = orderPriority.indexOf(a.subPrograma);
  const bIndex = orderPriority.indexOf(b.subPrograma);

  if (aIndex > -1 && bIndex > -1) {
    return aIndex - bIndex;
  } else if (aIndex > -1) {
    return -1;
  } else if (bIndex > -1) {
    return 1;
  } else {
    return a.subPrograma.localeCompare(b.subPrograma);
  }
};

export function useGrupoUsuarioTableConfig() {
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const confirmModal = useConfirmModal();
  const {isAdmin} = useHasPermissao();
  const api = useGrupoUsuarioModuleApi();
  const toast = useToast();
  const {triggerReload} = useReload();

  async function deleteOnClick(id: GridRowId) {
    await api.excluirGrupoUsuario(id.toString(), () => {
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
        getActions: (params: GridRowParams<IGrupoUsuario>) => [
          <>
            {isAdmin() && (
              <GridActionsCellItem
                label="Visualizar"
                icon={<VisibilityIcon />}
                onClick={() => navigate(`/grupo-usuarios/details`, {state: {id: params.id}})}
                title={`${translate('global.show')}`}
              />
            )}
          </>,
          <>
            {isAdmin() && (
              <GridActionsCellItem
                label="Editar"
                icon={<ModeEditIcon />}
                onClick={() => navigate(`/grupo-usuarios/edit`, {state: {id: params.id}})}
                title={`${translate('global.edit')}`}
              />
            )}
          </>,
          <>
            {isAdmin() && (
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
