import {useTheme} from 'styled-components';
import {Screen} from '#components/screen';
import {Spacer} from '#components/spacer';
import {useHasPermissao} from '#hooks/use-has-permissao';
import {useTranslate} from '#hooks/use-translate';
import {sidebarModuloConfig} from '../config';
import {ICategoriaLayout, IProgramaLayout} from '../types';
import * as S from './styles';
import {ModuloIndexProps} from './types';
import { useNavigate } from 'react-router-dom';

export function ModuloIndex(props: ModuloIndexProps) {
  const {hasCategoriaPermissao, hasModuloPermissao, hasProgramaPermissao, isAdmin} =
    useHasPermissao();
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const theme = useTheme();
  const modulo = sidebarModuloConfig.filter((x) => x.name === props.modulo)[0];
  if (!modulo) return null;
  if (props.modulo === '') return null;

  function moduloGate(name: string, onlyAdmin?: boolean) {
    if (!name || name === '') return false;
    if (onlyAdmin && !isAdmin()) return false;
    return hasModuloPermissao(name);
  }

  return (
    <>
      {moduloGate(modulo.name || '') ? (
        <Screen title={`sideBar.moduloTitle.${modulo.name}`}>
          <S.Row>
            {modulo.categorias.map((categoria: ICategoriaLayout) => (
              <>
                {categoria.programas.length === 0 &&
                  hasCategoriaPermissao(modulo.name, categoria.name) && (
                    <S.Button
                      onClick={() => {
                        if (categoria.route) {
                          props.setShowModuloScreen(false);
                          props.setSelectedCategoria(categoria.name);
                          props.setSelectedPrograma('');
                          navigate(categoria.route);
                        }
                      }}
                    >
                      {categoria.icon && categoria.icon(45, theme.colors.primary)}
                      <S.Text>{translate(`sideBar.categoria.${categoria.name}`)}</S.Text>
                    </S.Button>
                  )}
              </>
            ))}
          </S.Row>

          {modulo.categorias.map((categoria: ICategoriaLayout) => (
            <>
              {categoria.programas.length !== 0 &&
                hasCategoriaPermissao(modulo.name, categoria.name) && (
                  <>
                    <Spacer marginTop={15} text={`sideBar.categoria.${categoria.name}`} />
                    <S.Row>
                      {categoria.programas.map((programa: IProgramaLayout) => (
                        <>
                          {hasProgramaPermissao(
                            modulo.name,
                            categoria.name,
                            programa.name,
                            programa.entrySubprograma,
                          ) && (
                            <S.Button
                              onClick={() => {
                                props.setShowModuloScreen(false);
                                props.setSelectedCategoria(categoria.name);
                                props.setSelectedPrograma(programa.name);
                                programa.route && navigate(programa.route);
                              }}
                            >
                              {categoria.icon && categoria.icon(45, theme.colors.primary)}
                              <S.Text>{translate(`sideBar.programa.${programa.name}`)}</S.Text>
                            </S.Button>
                          )}
                        </>
                      ))}
                    </S.Row>
                  </>
                )}
            </>
          ))}
        </Screen>
      ) : (
        <></>
      )}
    </>
  );
}
