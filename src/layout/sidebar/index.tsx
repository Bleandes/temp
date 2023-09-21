import {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import DefaultBanner from '#assets/jpg/banner-ffw.jpg';
import DefaultLogo from '#assets/png/logo.png';
import {blackOrWhite} from '#helper/black-or-white';
import {useGlobalContext} from '#hooks/use-global-context';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useTranslate} from '#hooks/use-translate';
import {sidebarModuloConfig} from '../config';
import {ICategoriaLayout, IModuloLayout, IProgramaLayout} from '../types';
import * as S from './styles';
import {IPossibleRoute, SidebarProps} from './types';
import {useNavigate} from 'react-router-dom';

export function Sidebar(props: SidebarProps) {
  const {translate} = useTranslate();
  const navigate = useNavigate();
  const context = useGlobalContext();
  const sessionInfo = context.getSessionInfo();
  const theme = useTheme();
  const {hasCategoriaPermissao, hasModuloPermissao, hasProgramaPermissao, isAdmin} = useHasPermissao();
  const [possibleRoutes, setPossibleRoutes] = useState<IPossibleRoute[]>([]);
  const [search, setSearch] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState<IPossibleRoute[]>([]);

  useEffect(() => {
    generatePossibleRoutes();
  }, []);

  useEffect(() => {
    function normalize(text: string) {
      return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    if (search.length > 2) {
      const filtered = possibleRoutes.filter((value) =>
        normalize(value.ref).toLowerCase().includes(normalize(search.toLowerCase())),
      );
      setFilteredRoutes(filtered);
    } else {
      setFilteredRoutes([]);
    }
  }, [search]);

  function moduloGate(name: string, onlyAdmin?: boolean) {
    if (onlyAdmin && !isAdmin()) return false;
    return hasModuloPermissao(name);
  }

  function generatePossibleRoutes() {
    let possibleRoutes: IPossibleRoute[] = [];

    sidebarModuloConfig.forEach((modulo: IModuloLayout) => {
      modulo.categorias.forEach((categoria: ICategoriaLayout) => {
        if (hasCategoriaPermissao(modulo.name, categoria.name)) {
          if (categoria.programas.length === 0) {
            possibleRoutes.push({
              route: categoria.route || '',
              ref: `${translate(`sideBar.modulo.${modulo.name}`)}/${translate(`sideBar.categoria.${categoria.name}`)}`,
              modulo: modulo.name,
              categoria: categoria.name,
            });
          } else {
            categoria.programas.forEach((programa: IProgramaLayout) => {
              if (hasProgramaPermissao(modulo.name, categoria.name, programa.name, programa.entrySubprograma)) {
                possibleRoutes.push({
                  route: programa.route,
                  ref: `${translate(`sideBar.modulo.${modulo.name}`)}/${translate(
                    `sideBar.categoria.${categoria.name}`,
                  )}/${translate(`sideBar.programa.${programa.name}`)}`,
                  modulo: modulo.name,
                  categoria: categoria.name,
                  programa: programa.name,
                });
              }
            });
          }
        }
      });
    });
    setPossibleRoutes(possibleRoutes);
  }

  function renderFilteredMenu() {
    return (
      <S.WrapperFilteredContainer>
        {search.length > 2 && filteredRoutes.length !== 0 && (
          <S.FilteredContainer>
            {filteredRoutes.map((value: IPossibleRoute, index: number) => (
              <S.FilteredRow
                onClick={() => {
                  navigate(value.route);
                  setSearch('');
                  props.setSelectedModulo(value.modulo);
                  props.setSelectedCategoria(value.categoria || '');
                  props.setSelectedPrograma(value.programa || '');
                }}
                key={index}
              >
                <S.FilteredText>{value.ref}</S.FilteredText>
                <S.ArrowRight color={theme.colors.grey} />
              </S.FilteredRow>
            ))}
          </S.FilteredContainer>
        )}
      </S.WrapperFilteredContainer>
    );
  }

  function renderHeader() {
    return (
      <S.HeaderContainer>
        <S.ImageBanner
          src={
            sessionInfo.configuracaoEmpresa?.banner
              ? `${import.meta.env.VITE_DEFAULT_IMAGE_TYPE}${sessionInfo.configuracaoEmpresa?.banner}`
              : DefaultBanner
          }
        />
        <S.ImageLogo
          src={
            sessionInfo.configuracaoEmpresa?.logo
              ? `${import.meta.env.VITE_DEFAULT_IMAGE_TYPE},${sessionInfo.configuracaoEmpresa?.logo}`
              : DefaultLogo
          }
        />
        {props.pinned ? (
          <S.CircleDot onClick={() => props.setPinned(false)} />
        ) : (
          <S.Circle onClick={() => props.setPinned(true)} />
        )}
      </S.HeaderContainer>
    );
  }

  function renderSearch() {
    return (
      <>
        <S.WrapperSmallerSearchContainer>
          <S.SmallerSearchContainer>
            <S.SearchIcon />
          </S.SmallerSearchContainer>
        </S.WrapperSmallerSearchContainer>

        <S.SearchContainer>
          <S.SearchIcon />
          <S.Search
            placeholder={translate('sideBar.search.placeHolder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </S.SearchContainer>
      </>
    );
  }

  function renderModulo(modulo: IModuloLayout) {
    const isSelected = props.selectedModulo === modulo.name;
    const iconColor = isSelected ? blackOrWhite(theme.colors.primary) : theme.colors.grey;
    const icon = () => {
      if (modulo.icon) return modulo.icon(25, iconColor);
    };
    return (
      <>
        <S.ModuloRow
          selected={isSelected}
          key={modulo.name}
          onClick={() => {
            props.setSelectedModulo(isSelected ? '' : modulo.name);
            props.setSelectedCategoria('');
            props.setSelectedPrograma('');
            if (props.selectedModulo !== modulo.name) props.setShowModuloScreen(true);
          }}
        >
          {icon()}
          <S.ModuloText selected={isSelected}>{translate(`sideBar.modulo.${modulo.name}`)}</S.ModuloText>
          {isSelected ? <S.ArrowUp color={iconColor} /> : <S.ArrowDown color={iconColor} />}
        </S.ModuloRow>
        <S.SmallerModuloRow selected={isSelected} key={modulo.name}>
          {icon()}
        </S.SmallerModuloRow>
      </>
    );
  }

  function renderCategoria(categoria: ICategoriaLayout) {
    const isSelected = props.selectedCategoria === categoria.name;
    const iconColor = isSelected ? blackOrWhite(theme.colors.primary) : theme.colors.grey;
    const icon = () => {
      if (categoria.icon) return categoria.icon(25, iconColor);
    };
    return (
      <S.CategoriaRow
        categoria
        selected={isSelected}
        onClick={() => {
          props.setSelectedCategoria(isSelected ? '' : categoria.name);
          if (categoria.programas.length === 0) {
            props.setSelectedPrograma('');
            categoria.route && navigate(categoria.route);
            props.setShowModuloScreen(false);
          }
        }}
      >
        {icon()}
        <S.CategoriaText selected={isSelected}>{translate(`sideBar.categoria.${categoria.name}`)}</S.CategoriaText>
        {isSelected && categoria.programas.length > 0 ? <S.ArrowUp color={iconColor} /> : <></>}
      </S.CategoriaRow>
    );
  }

  function renderPrograma(programa: IProgramaLayout) {
    const isSelected = props.selectedPrograma === programa.name;
    return (
      <S.ProgramaRow
        programa
        key={`${programa.name}.${programa.route}`}
        selected={isSelected}
        onClick={() => {
          props.selectedPrograma !== programa.name && props.setSelectedPrograma(programa.name);
          programa.route && navigate(programa.route);
          props.setShowModuloScreen(false);
        }}
      >
        <S.Dot color={isSelected ? blackOrWhite(theme.colors.primary) : theme.colors.grey} />
        <S.ProgramaText selected={isSelected}>{translate(`sideBar.programa.${programa.name}`)}</S.ProgramaText>
      </S.ProgramaRow>
    );
  }

  return (
    <S.MenuSidebar pinned={props.pinned}>
      {renderHeader()}

      {renderSearch()}

      {renderFilteredMenu()}

      {search.length < 3 && (
        <S.MenuWrapper>
          {sidebarModuloConfig.map((modulo: IModuloLayout) => (
            <>
              {moduloGate(modulo.name) && (
                <>
                  {renderModulo(modulo)}

                  {props.selectedModulo === modulo.name &&
                    modulo.categorias.map((categoria: ICategoriaLayout) => (
                      <>
                        {hasCategoriaPermissao(modulo.name, categoria.name) && (
                          <>
                            {renderCategoria(categoria)}

                            {props.selectedCategoria === categoria.name &&
                              categoria.programas.map((programa: IProgramaLayout) => (
                                <>
                                  {hasProgramaPermissao(
                                    modulo.name,
                                    categoria.name,
                                    programa.name,
                                    programa.entrySubprograma,
                                  ) && <>{renderPrograma(programa)}</>}
                                </>
                              ))}
                          </>
                        )}
                      </>
                    ))}
                </>
              )}
            </>
          ))}
        </S.MenuWrapper>
      )}
    </S.MenuSidebar>
  );
}
