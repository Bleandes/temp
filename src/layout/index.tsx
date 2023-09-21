import {useEffect, useState} from 'react';
import {useGlobalContext} from '#hooks/use-global-context';
import {LayoutSettings} from './layout-settings';
import {ModuloIndex} from './modulo-index';
import {Sidebar} from './sidebar';
import * as S from './styles';
import {Topbar} from './topbar';
import {Outlet} from 'react-router-dom';

export function DefaultLayout() {
  const context = useGlobalContext();
  const layoutConfig = context.getLayoutConfig();
  const [selectedModulo, setSelectedModulo] = useState(layoutConfig?.selectedModulo ?? '');
  const [selectedCategoria, setSelectedCategoria] = useState(layoutConfig?.selectedCategoria ?? '');
  const [selectedPrograma, setSelectedPrograma] = useState(layoutConfig?.selectedPrograma ?? '');
  const [sideBarPinned, setSideBarPinned] = useState(layoutConfig?.sideBarPinned ?? false);
  const [showModuloScreen, setShowModuloScreen] = useState(false);

  useEffect(() => {
    context.setLayoutConfig('selectedPrograma', selectedPrograma);
  }, [selectedPrograma]);

  useEffect(() => {
    context.setLayoutConfig('selectedCategoria', selectedCategoria);
  }, [selectedCategoria]);

  useEffect(() => {
    context.setLayoutConfig('selectedModulo', selectedModulo);
  }, [selectedModulo]);

  useEffect(() => {
    context.setLayoutConfig('sideBarPinned', sideBarPinned);
  }, [sideBarPinned]);

  return (
    <S.LayoutContainer>
      <Sidebar
        setSelectedModulo={setSelectedModulo}
        setSelectedCategoria={setSelectedCategoria}
        setSelectedPrograma={setSelectedPrograma}
        selectedModulo={selectedModulo}
        selectedCategoria={selectedCategoria}
        selectedPrograma={selectedPrograma}
        setShowModuloScreen={setShowModuloScreen}
        pinned={sideBarPinned}
        setPinned={setSideBarPinned}
      />

      <S.OutletContainer pinned={sideBarPinned}>
        <Topbar />
        {showModuloScreen ? (
          <ModuloIndex
            modulo={selectedModulo}
            setShowModuloScreen={setShowModuloScreen}
            setSelectedModulo={setSelectedModulo}
            setSelectedCategoria={setSelectedCategoria}
            setSelectedPrograma={setSelectedPrograma}
          />
        ) : (
          <Outlet />
        )}
      </S.OutletContainer>

      <LayoutSettings />
    </S.LayoutContainer>
  );
}
