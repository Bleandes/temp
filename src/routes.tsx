import {useErrorModal} from '#components/modal/error-modal';
import {IPermissao} from '#pages/grupo-usuario/types';
import {Login} from '#pages/login';
import {ISessionInfo} from '#pages/login/types';
import {PropsWithChildren, ReactElement} from 'react';
import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {DefaultLayout} from './layout';

export interface RouteProps {
  path: string;
  element: () => JSX.Element;
}

export function AppRoutes() {
  const errorModal = useErrorModal();

  const Private = (props: PropsWithChildren<{path: string}>): ReactElement | null => {
    const auth = localStorage.getItem('auth');
    const isAuthenticated = {
      confirm: `${JSON.parse(auth as string)}`,
    };

    if (isAuthenticated.confirm == '' || isAuthenticated.confirm == 'null') {
      return <Navigate to="/login" />;
    }

    const sessionInfo = JSON.parse(localStorage.getItem('sessionInfo') as string) as ISessionInfo;

    if (sessionInfo.forcarTrocaSenha) {
      return <Navigate to="/login" />;
    }

    if (sessionInfo.nivel === 0) {
      const permissoes = JSON.parse(localStorage.getItem('permissoes') as string) as IPermissao[];
      const filter = permissoes.filter((value) => value.rota === props.path);

      if (filter.length === 0) {
        errorModal.show({message: 'global.errors.noRoutePermission'});
        return null;
      }
    }

    return <>{props.children}</>;
  };

  const pages = import.meta.glob('./Pages/**/*.page.tsx', {
    import: 'routes',
    eager: true,
  }) as any;

  const routesDefinitions = Object.values<RouteProps>(pages).flat();

  //console.log('routes: ', routesDefinitions);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forcar-troca-senha" element={<TrocarSenhaForcada />} />
        <Route path="/portal-fornecedor-compra/:id" element={<PortalFornecedorCompra />} />  */}

        <Route path="/" element={<DefaultLayout />}>
          {routesDefinitions.map((value) => (
            <Route
              key={value.path}
              path={value.path}
              element={<Private path={value.path}>{value.element()}</Private>}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}
