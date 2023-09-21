import {useToast} from '#components/toast';
import {useHasPermissao} from '#hooks/use-has-permissao';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {GridActionsCellItem, GridRowId, GridRowParams} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import {useProdutoModuleApi} from './api';
import {useReload} from '#hooks/use-reload';
import {useConfirmModal} from '#components/modal/confirm-modal';
import {useTranslate} from '#hooks/use-translate';
import {IEnum} from '#types/global-types';

export function useProdutoTableConfig() {
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const confirmModal = useConfirmModal();
  const {triggerReload} = useReload();
  const api = useProdutoModuleApi();
  const toast = useToast();
  const {hasPermissaoById} = useHasPermissao();

  async function deleteOnClick(id: GridRowId) {
    await api.excluirProduto(id.toString(), () => {
      triggerReload();
      toast.showSuccessToast('global.success.delete');
    });
  }

  function generateConfig() {
    return [
      {
        field: 'descricao',
        headerName: `${translate('global.description')}`,
        flex: 0.8,
      },
      {
        field: 'actions',
        headerName: `${translate('global.actions')}`,
        flex: 0.2,
        type: 'actions',
        getActions: (params: GridRowParams) => [
          <>
            {hasPermissaoById('/produto/details') && (
              <GridActionsCellItem
                label="Visualizar"
                icon={<VisibilityIcon />}
                onClick={() => navigate(`/produto/details`, {state: {id: params.id}})}
                title={`${translate('global.show')}`}
              />
            )}
          </>,
          //   <>
          //     {hasPermissaoById('/produto/edit') && (
          //       <GridActionsCellItem
          //         label="Editar"
          //         icon={<ModeEditIcon />}
          //         onClick={() => navigate(`/produto/edit`, {state: {id: params.id}})}
          //         title={`${translate('global.edit')}`}
          //       />
          //     )}
          //   </>,
          //   <>
          //     {hasPermissaoById('/produto/delete') && (
          //       <GridActionsCellItem
          //         label="Excluir"
          //         icon={<DeleteIcon />}
          //         onClick={() =>
          //           confirmModal.show({
          //             message: translate('global.confirmations.delete'),
          //             onConfirm: () => deleteOnClick(params.id),
          //           })
          //         }
          //         title={`${translate('global.delete')}`}
          //       />
          //     )}
          //   </>,
        ],
      },
    ];
  }

  function optionsCurvaAbc(): IEnum[] {
    return [
      {
        index: 3,
        value: translate('compras.optionsCurvaAbc.geral'),
      },
      {
        index: 0,
        value: 'A',
      },
      {
        index: 1,
        value: 'B',
      },
      {
        index: 2,
        value: 'C',
      },
    ];
  }

  function optionsSituacaoTributaria() {
    return [
      {
        index: 0,
        value: translate('produto.optionsSituacaoTributaria.tributadaIntegralmente'),
      },
      {
        index: 1,
        value: translate('global.exempt'),
      },
      {
        index: 2,
        value: translate('produto.optionsSituacaoTributaria.substituicaoTributaria'),
      },
      {
        index: 3,
        value: translate('produto.optionsSituacaoTributaria.NaoIncidencia'),
      },
      {
        index: 4,
        value: translate('produto.optionsSituacaoTributaria.tributadoISS'),
      },
      {
        index: 5,
        value: translate('produto.optionsSituacaoTributaria.naoInformado'),
      },
    ];
  }

  return {
    generateConfig,
    optionsCurvaAbc,
    optionsSituacaoTributaria,
  };
}
