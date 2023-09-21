import Divider from '@mui/material/Divider';
import {useEffect, useState} from 'react';
import {DefaultModal} from '#components/modal/default-modal';
import {useGlobalContext} from '#hooks/use-global-context';
import {useKeyDown} from '#hooks/use-key-down';
import {useTranslate} from '#hooks/use-translate';
import {useLoginModuleApi} from '#pages/login/api';
import {IEstabelecimento} from '#pages/login/types';
import * as S from './styles';
import {useNavigate} from 'react-router-dom';

export function MenuProfile() {
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const context = useGlobalContext();
  const estabelecimentos = context.getEstabelecimentos();
  const sessionInfo = context.getSessionInfo();
  const isDark = !!context.getPersistValue('darkTheme');
  const selectedEstabelecimento = context.getSelectedEstabelecimento();
  const [menuRef, setMenuRef] = useState<null | HTMLElement>(null);
  const loginModule = useLoginModuleApi();
  const [openMenu, setOpenMenu] = useState(false);
  const [showEstabelecimentoModal, setShowEstabelecimentoModal] = useState(false);
  const [estabelecimento, setEstabelecimento] = useState<IEstabelecimento | undefined>();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuRef(event.currentTarget);
    setOpenMenu(!openMenu);
  };

  useKeyDown(() => {
    setOpenMenu(!openMenu);
  }, ['Escape']);

  function handleClose() {
    setOpenMenu(false);
  }

  function changeEstabelecimento(filial: IEstabelecimento) {
    setShowEstabelecimentoModal(false);
    setEstabelecimento(filial);
    context.setPersistContext('estabelecimento', filial);
  }

  function isEstabelecimentoValid() {
    let toReturn = false;
    if (!selectedEstabelecimento) return false;
    if (estabelecimentos && estabelecimentos.length > 0) {
      estabelecimentos.forEach((element: IEstabelecimento) => {
        if (selectedEstabelecimento.id === element.id && selectedEstabelecimento.empresaId === element.empresaId) {
          toReturn = true;
        }
      });
    }

    return toReturn;
  }

  useEffect(() => {
    if (selectedEstabelecimento && isEstabelecimentoValid()) {
      return changeEstabelecimento(selectedEstabelecimento);
    }

    if (estabelecimentos?.length > 0) {
      return changeEstabelecimento(estabelecimentos[0]);
    }

    changeEstabelecimento({} as IEstabelecimento);
  }, []);

  function profilePicture(noCursor?: boolean) {
    return (
      <S.UserIconBackGround onClick={noCursor ? () => {} : handleClick} noCursor={noCursor}>
        {sessionInfo.avatar && sessionInfo.avatar !== '' ? (
          <S.Avatar src={import.meta.env.VITE_DEFAULT_IMAGE_TYPE + sessionInfo.avatar} />
        ) : (
          <S.UserIcon />
        )}
      </S.UserIconBackGround>
    );
  }

  return (
    <S.UserRow>
      {estabelecimentos?.length > 1 && (
        <S.FilialMenuRow onClick={() => setShowEstabelecimentoModal(true)}>
          <S.FilialMenuText margin={5}>{`${translate('global.branch')}:`}</S.FilialMenuText>
          <S.FilialMenuText>{`${estabelecimento?.id}`}</S.FilialMenuText>
        </S.FilialMenuRow>
      )}

      {profilePicture()}

      <S.StyledMenu
        id="customized-menu"
        anchorEl={menuRef}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <S.UserMenuRow>
          {profilePicture(true)}
          <S.UserInfoColumn>
            <S.UserName>{sessionInfo.nomeAbreviado}</S.UserName>
            <S.UserRole>
              {sessionInfo.nivel === 1
                ? translate('sideBar.user.admin')
                : sessionInfo.nivel === 2
                ? translate('sideBar.user.owner')
                : sessionInfo.nivel === 3
                ? 'PrismaFive'
                : sessionInfo.nomeGrupoUsuario ?? translate('sideBar.user.regular')}
            </S.UserRole>
          </S.UserInfoColumn>
        </S.UserMenuRow>

        <Divider sx={{my: 0.5}} />

        <S.StyledMenuItem
          onClick={() => {
            handleClose();
            navigate('/perfil');
          }}
          disableRipple
          themeDark={isDark}
        >
          <S.MenuProfileIcon />
          <S.MenuItemText>{translate('topbar.user.profile')}</S.MenuItemText>
        </S.StyledMenuItem>

        <S.StyledMenuItem
          onClick={() => {
            handleClose();
            loginModule.logout();
            navigate('/login');
          }}
          disableRipple
          themeDark={isDark}
        >
          <S.LogoutIcon />
          <S.MenuItemText>{translate('global.logout')}</S.MenuItemText>
        </S.StyledMenuItem>
      </S.StyledMenu>

      <DefaultModal
        show={showEstabelecimentoModal}
        hideButtons
        title={'global.branches'}
        closeButton
        onClose={() => setShowEstabelecimentoModal(false)}
        headerMargin={'0px 0px 15px 0px'}
        modalWidth={'500px'}
      >
        {estabelecimentos &&
          estabelecimentos.map((value: IEstabelecimento, index: number) => (
            <S.FilialModalRow themeDark={isDark} onClick={() => changeEstabelecimento(value)} key={index}>
              <S.FilialModalText>{`${value.id} - ${value.razaoSocial}`}</S.FilialModalText>
            </S.FilialModalRow>
          ))}
      </DefaultModal>
    </S.UserRow>
  );
}
