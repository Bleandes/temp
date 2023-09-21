import {useState} from 'react';
import {useGlobalContext} from '#hooks/use-global-context';
import {useTranslate} from '#hooks/use-translate';
import {useThemeProvider} from '#theme/theme';
import * as S from './styles';
import {LanguageSelector} from '#components/language-selector';

export function LayoutSettings() {
  const {translate} = useTranslate();
  const context = useGlobalContext();
  const themeProvider = useThemeProvider();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showSettingsButton, setShowSettingsButton] = useState(true);
  const [themeDark, setThemeDark] = useState(!!context.getPersistValue('darkTheme'));

  function openSettingsMenu() {
    setShowSettingsMenu(true);
    setShowSettingsButton(false);
  }

  function closeSettingsMenu() {
    setShowSettingsMenu(false);
    setShowSettingsButton(true);
  }

  function changeTheme() {
    setThemeDark(!themeDark);
    context.setPersistContext('darkTheme', !themeProvider.isDark);
    themeProvider.changeTheme();
  }

  return (
    <>
      <S.SettingsButton show={showSettingsButton} onClick={openSettingsMenu}>
        <S.SettingsIcon />
      </S.SettingsButton>
      <S.SettingsMenu show={showSettingsMenu}>
        <S.SettingsMenuHeader>
          <S.HeaterTitle>{translate('layout.settings.title')}</S.HeaterTitle>
          <S.CloseSettingsButton onClick={closeSettingsMenu}>
            <S.CloseIcon />
          </S.CloseSettingsButton>
        </S.SettingsMenuHeader>

        <S.Divider sx={{my: 0.5}} />

        <S.SettingRow>
          <S.SettingsText>{`${translate('global.theme')}:`}</S.SettingsText>
          <S.ToggleContainer onClick={changeTheme}>
            <S.ToggleTheme checked={themeProvider.isDark} />
          </S.ToggleContainer>
        </S.SettingRow>

        <S.SettingRow>
          <S.SettingsText>{`${translate('global.language')}:`}</S.SettingsText>
          <LanguageSelector useDark={true} />
        </S.SettingRow>
      </S.SettingsMenu>
    </>
  );
}
