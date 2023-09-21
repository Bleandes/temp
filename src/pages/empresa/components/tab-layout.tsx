import {Tooltip} from '@mui/material';
import {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {ColorPicker} from '#components/color-picker';
import {ImagePicker} from '#components/image-picker';
import {useTranslate} from '#hooks/use-translate';
import {TabProps} from '#pages/empresa/types';
import * as S from './styles';

const imageType = 'data:image/png;base64,';
export const TabLayout = (props: TabProps) => {
  const theme = useTheme();
  const {translate} = useTranslate();
  const [color, setColor] = useState(theme.colors.primary);
  const [banner, setBanner] = useState(
    props.empresaServer.configuracaoEmpresa?.banner === props.empresaForm.configuracaoEmpresa?.banner
      ? ''
      : imageType + props.empresaForm.configuracaoEmpresa?.banner,
  );
  const [logo, setLogo] = useState(
    props.empresaServer.configuracaoEmpresa?.logo === props.empresaForm.configuracaoEmpresa?.logo
      ? ''
      : imageType + props.empresaForm.configuracaoEmpresa?.logo,
  );

  function handleColorChange(newColor: string) {
    setColor(newColor);
    props.handleFormChange('configuracaoEmpresa', {
      ...props.empresaForm.configuracaoEmpresa,
      cor: newColor,
    });
  }

  function handleBannerChange(newBanner: string) {
    setBanner(newBanner);
    props.handleFormChange('configuracaoEmpresa', {
      ...props.empresaForm.configuracaoEmpresa,
      banner: newBanner.replace(imageType, ''),
    });
  }

  function handleLogoChange(newLogo: string) {
    setLogo(newLogo);
    props.handleFormChange('configuracaoEmpresa', {
      ...props.empresaForm.configuracaoEmpresa,
      logo: newLogo.replace(imageType, ''),
    });
  }

  useEffect(() => {
    if (props.toucheds.length === 0) {
      setBanner('');
      setLogo('');
      setColor(theme.colors.primary);
    }
  }, [props.toucheds]);

  return (
    <>
      <S.Row>
        <Tooltip title={translate(props.edit ? 'empresa.tooltips.banner' : '')}>
          <S.BannerPicker disabled={!props.edit}>
            <ImagePicker maxWidth={1080} maxHeight={295} onChange={handleBannerChange} disabled={!props.edit} />
            {banner === '' ? (
              <>
                <S.BannerUploadText>{'Banner'}</S.BannerUploadText>
                <S.RightBackground>
                  <S.IconWrapper>
                    <S.Icon />
                  </S.IconWrapper>
                </S.RightBackground>
              </>
            ) : (
              <S.BannerImage src={banner} />
            )}
          </S.BannerPicker>
        </Tooltip>

        <Tooltip title={translate(props.edit ? 'empresa.tooltips.logo' : '')}>
          <S.LogoPicker disabled={!props.edit}>
            <ImagePicker maxWidth={450} maxHeight={450} onChange={handleLogoChange} disabled={!props.edit} />
            {logo === '' ? (
              <>
                <S.LogoUploadText>{'Logo'}</S.LogoUploadText>
                <S.TopBackground>
                  <S.LogoIconWrapper>
                    <S.LogoIcon />
                  </S.LogoIconWrapper>
                </S.TopBackground>
              </>
            ) : (
              <S.LogoImage src={logo} />
            )}
          </S.LogoPicker>
        </Tooltip>
      </S.Row>
      <ColorPicker
        color={color}
        setColor={handleColorChange}
        text={'empresa.tabs.layout.datePicker'}
        disabled={!props.edit}
      />
    </>
  );
};
