import 'react-toastify/dist/ReactToastify.css';
import 'react-toggle/style.css';
import styled from 'styled-components';
import {GlobalStyle} from './global-styles';
import {AppRoutes} from './routes';
import {useThemeProvider} from '#theme/theme';
import {useGlobalContext} from '#hooks/use-global-context';
import {useLoader} from '#components/loader';
import {useErrorModal} from '#components/modal/error-modal';
import {useConfirmModal} from '#components/modal/confirm-modal';
import {useToast} from '#components/toast';
import {useReload} from '#hooks/use-reload';
import './locales/i18n';

const AppView = styled.div`
  position: relative;
  z-index: 1;
  width: 100vw;
`;

function App() {
  const Theme = useThemeProvider();
  const Context = useGlobalContext();
  const Loader = useLoader();
  const ErrorModal = useErrorModal();
  const ConfirmModal = useConfirmModal();
  const Toast = useToast();
  const Reload = useReload();

  return (
    <Context.Component>
      <Theme.Component>
        <AppView>
          <Loader.Component />
          <Toast.Component />
          <ErrorModal.Component />
          <ConfirmModal.Component />
          <Reload.Component />
          <AppRoutes />
          <GlobalStyle />
        </AppView>
      </Theme.Component>
    </Context.Component>
  );
}

export default App;
