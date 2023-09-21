import DividerBase from '@mui/material/Divider';
import {BsFillMoonFill, BsFillSunFill} from 'react-icons/bs';
import {IoMdClose} from 'react-icons/io';
import {TbSettings} from 'react-icons/tb';
import Toggle from 'react-toggle';
import styled from 'styled-components';
import {ColumnContainer, RowContainer} from '#components/styled-containers';
import {Text} from '#components/text';
import {blackOrWhite} from '#helper/black-or-white';

export const SettingsButton = styled(styled.button``)<{show: boolean}>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: absolute;
  height: 38px;
  width: 38px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: center;
  top: calc(50%);
  right: 0px;
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`;

export const SettingsIcon = styled(TbSettings)`
  color: ${(props) => blackOrWhite(props.theme.colors.primary)};
  font-size: 23px;
`;

export const SettingsMenu = styled(ColumnContainer)<{show: boolean}>`
  position: absolute;
  z-index: 999;
  border-left: 1px solid ${(props) => (props.show ? props.theme.colors.lightGrey : 'transparent')};
  width: ${(props) => (props.show ? 400 : 0)}px;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  right: 0px;
  transition: width 0.3s ease-out;
  overflow: hidden;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const SettingsMenuHeader = styled(RowContainer)`
  justify-content: space-between;
  padding: 10px;
  width: 100%;
`;

export const CloseSettingsButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightGreyAlfa};
  }
`;

export const CloseIcon = styled(IoMdClose)`
  font-size: 25px;
  color: ${(props) => props.theme.colors.greyWhiteInverter};
`;

export const HeaterTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.colors.greyWhiteInverter};
`;

export const Divider = styled(DividerBase)`
  width: 100%;
`;

export const SettingRow = styled(RowContainer)`
  width: 100%;
  padding: 10px;
`;

export const SettingsText = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.smaller};
  color: ${(props) => props.theme.colors.greyWhiteInverter};
  margin-right: 10px;
`;

export const ToggleContainer = styled(ColumnContainer)`
  margin-right: 15px;
  & .react-toggle--checked .react-toggle-track {
    background-color: ${(props) => props.theme.colors.white};
  }

  & .react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${(props) => props.theme.colors.black};
  }

  & .react-toggle-track {
    background-color: ${(props) => props.theme.colors.black};
  }
`;

export const ToggleTheme = styled(Toggle).attrs((props) => ({
  icons: {
    unchecked: <BsFillMoonFill size={12} color={props.theme.colors.white} />,
    checked: <BsFillSunFill size={12} color={props.theme.colors.black} />,
  },
}))``;
