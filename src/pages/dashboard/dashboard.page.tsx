import {useEffect} from 'react';
import {useConfirmModal} from '#components/modal/confirm-modal';
import {useGlobalContext} from '#hooks/use-global-context';
import {useNavigate} from 'react-router-dom';

function Dashboard() {
  const context = useGlobalContext();
  const confirmModal = useConfirmModal();
  const navigate = useNavigate();
  const sessionInfo = context.getSessionInfo();

  useEffect(() => {
    if (sessionInfo.configuracaoEmpresa?.emailConfigurado) {
      if (sessionInfo.nivel === 0) {
        confirmModal.show({message: 'dashboard.errors.noDefaultEmail'});
      } else {
        confirmModal.show({
          message: 'dashboard.errors.noDefaultEmailAdmin',
          hideCancel: true,
          onConfirm: () => navigate('/configuracoes-email'),
        });
      }
    }
  }, []);

  return <></>;
}

export const routes = [
  {
    path: '/dashboard',
    element: () => <Dashboard />,
  },
];
