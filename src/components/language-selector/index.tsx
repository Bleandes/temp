import MenuItem from '@mui/material/MenuItem';
import {SelectChangeEvent} from '@mui/material/Select';
import {useEffect, useState} from 'react';
import i18n from '#locales/i18n';
import spainFlag from '#assets/jpg/spain-flag.jpg';
import usFlag from '#assets/jpg/us-flag.jpg';
import brasilFlag from '#assets/png/brasil-flag.png';
import {useGlobalContext} from '#hooks/use-global-context';
import {useTranslate} from '#hooks/use-translate';
import * as S from './styles';
import {useTheme} from 'styled-components';

export function LanguageSelector(props: {useDark?: boolean}) {
  const context = useGlobalContext();
  const {translate} = useTranslate();
  const theme = useTheme();
  const [selectLanguage, setSelectLanguage] = useState(context.persistValues.language);

  async function changeLanguageInit() {
    return i18n.changeLanguage(context.persistValues.language);
  }

  useEffect(() => {
    changeLanguageInit();
  }, []);

  function changeLanguage(e: SelectChangeEvent) {
    setSelectLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
    context.setPersistContext('language', e.target.value);
  }

  return (
    <S.StyledSelect
      value={selectLanguage}
      onChange={(e: any) => changeLanguage(e)}
      sx={{
        minWidth: 150,
        maxHeight: 30,
        alignItems: 'center',
        '& .MuiSvgIcon-root': {
          color: theme.colors.greyWhiteInverter,
        },
      }}
      MenuProps={{
        sx: {
          '& .MuiList-root': {
            backgroundColor: theme.colors.backgroundColor,
          },
        },
      }}
    >
      <MenuItem value={'pt-BR'} sx={{alignItems: 'center'}}>
        <S.Flag src={brasilFlag} />
        <S.RegularText useDark={props.useDark}>{translate('login.doNotTranslate.languages.pt_BR')}</S.RegularText>
      </MenuItem>
      <MenuItem value={'es-ES'}>
        <S.Flag src={spainFlag} />
        <S.RegularText useDark={props.useDark}>{translate('login.doNotTranslate.languages.es_ES')}</S.RegularText>
      </MenuItem>
      <MenuItem value={'en-US'}>
        <S.Flag src={usFlag} />
        <S.RegularText useDark={props.useDark}>{translate('login.doNotTranslate.languages.en_US')}</S.RegularText>
      </MenuItem>
    </S.StyledSelect>
  );
}
