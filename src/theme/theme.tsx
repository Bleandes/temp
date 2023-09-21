import {PropsWithChildren, useState} from 'react';
import {ThemeProvider} from 'styled-components';
import {useGlobalContext} from '#hooks/use-global-context';
import {ISessionInfo} from '#pages/login/types';

const fontSize = {
  fontSize: {
    title: '2rem', //32px
    bigger: '1.36rem', //22px
    big: '1.25rem', //20px
    default: '1.13rem', //18px
    small: '1rem', //16px
    smaller: '0.88rem', //14px
    tiny: '0.75rem', //12px;
  },
};

function light(primary: string) {
  const lightTheme = {
    colors: {
      primaryFFW: '#cf0209',
      primary: primary,
      secondary: '#5b6873',
      white: '#FFFFFF',
      black: '#000000',
      lightGreen: '#27a844',
      limeGreen: '#1CCA00',
      red: '#E50000',
      grey: '#808080',
      darkGrey: '#5A5A5A',
      lightBlack: '#272727',
      lightGreyAlfa: '#f3f3f3c3',
      lightGrey: '#D3D3D3',
      backgroundColor: '#FCFCFC',
      blackWhiteInverter: '#000000',
      blackGreyInverter: '#000000',
      greyWhiteInverter: '#525252',
      darkGreyWhiteInverter: '#FCFCFC',
      lightGreyGreyInverter: '#D3D3D3',
      yellow: '#FFEF99',
      brown: '#987417',
      blue: '#0047AB',
      gradients: {
        login: {
          from: '#FF0B0B',
          to: '#D10000',
        },
      },
      statusCotacao: {
        processadas: '#2c742c',
        rejeitadas: '#a31010',
        emitidas: '#FFCC00',
        hover: {
          emitidas: '#FF9900',
          rejeitadas: '#990000',
          processadas: '#015501',
        },
      },
      ultimasVendas: {
        vendaAcabado: '#90caf9',
        vendaManipulacao: '#fff59d',
        movimentoProduto: '#ef9a9a',
        hover: {
          vendaAcabado: '#73baf5',
          vendaManipulacao: '#fcec5d',
          movimentoProduto: '#e77878',
        },
      },
    },
    schema: 'light',
    ...fontSize,
  };
  return lightTheme;
}

function dark(primary: string) {
  const darkTheme = {
    colors: {
      primaryFFW: '#cf0209',
      primary: primary,
      secondary: '#5b6873',
      white: '#FFFFFF',
      black: '#000000',
      lightGreen: '#27a844',
      limeGreen: '#1CCA00',
      red: '#E50000',
      grey: '#808080',
      darkGrey: '#5A5A5A',
      lightBlack: '#272727',
      lightGreyAlfa: '#f3f3f3c3',
      lightGrey: '#D3D3D3',
      backgroundColor: '#2F3349',
      blackWhiteInverter: '#FFFFFF',
      blackGreyInverter: '#5b6873',
      greyWhiteInverter: '#FFFFFF',
      darkGreyWhiteInverter: '#5A5A5A',
      lightGreyGreyInverter: '#808080',
      yellow: '#FFEF99',
      brown: '#987417',
      blue: '#0047AB',
      gradients: {
        login: {
          from: '#FF0B0B',
          to: '#D10000',
        },
      },
      statusCotacao: {
        processadas: '#2c742c',
        rejeitadas: '#FF0000',
        emitidas: '#FFCC00',
        hover: {
          emitidas: '#FF9900',
          rejeitadas: '#990000',
          processadas: '##015501',
        },
      },
      ultimasVendas: {
        vendaAcabado: '#90caf9',
        vendaManipulacao: '#fff59d',
        movimentoProduto: '#ef9a9a',
        hover: {
          vendaAcabado: '#73baf5',
          vendaManipulacao: '#fcec5d',
          movimentoProduto: '#e77878',
        },
      },
    },
    schema: 'dark',
    ...fontSize,
  };
  return darkTheme;
}

const typeLight = light('');
export type Theme = typeof typeLight;

let changeTheme: () => void;
let updatePrimaryColor: (color: string) => void;
let isDark: boolean;
function CustomThemeProvider(props: PropsWithChildren) {
  const context = useGlobalContext();
  const contextTheme = !!context.getPersistValue('darkTheme');
  const sessionInfo = context.getPersistValue('sessionInfo') as ISessionInfo;
  const [darkThemeState, setDarkThemeState] = useState(contextTheme);
  const [primaryColor, setPrimaryColor] = useState(
    sessionInfo?.configuracaoEmpresa?.cor || '#cf0209',
  );

  changeTheme = function changeInternalTheme() {
    setDarkThemeState(!darkThemeState);
  };

  updatePrimaryColor = function updateInternalPrimaryColor(color: string) {
    if (!color) return;
    setPrimaryColor(color);
  };

  isDark = darkThemeState;

  return (
    <ThemeProvider theme={darkThemeState ? dark(primaryColor.trim()) : light(primaryColor.trim())}>
      {props.children}
    </ThemeProvider>
  );
}

export function useThemeProvider() {
  return {
    Component: CustomThemeProvider,
    changeTheme,
    updatePrimaryColor,
    isDark,
  };
}
