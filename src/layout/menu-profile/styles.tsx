import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {BiUser} from 'react-icons/bi';
import {LiaUserCheckSolid} from 'react-icons/lia';
import {TbLogout} from 'react-icons/tb';
import styled from 'styled-components';
import {ColumnContainer, RowContainer} from '#components/styled-containers';
import {Text} from '#components/text';

export const UserRow = styled(RowContainer)`
  justify-content: space-between;
  background-color: transparent;
  margin-right: 15px;
`;

export const UserIcon = styled(BiUser)`
  color: ${(props) => props.theme.colors.greyWhiteInverter};
  font-size: 35px;
`;

export const UserIconBackGround = styled(styled.div``)<{noCursor?: boolean}>`
  background-color: transparent;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.noCursor ? '' : 'cursor: pointer')};
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

export const StyledMenu = styled(Menu)`
  margin-top: 50px;
  padding: 0px;
  & .MuiMenu-list {
    background-color: ${(props) => props.theme.colors.backgroundColor};
  }

  & .MuiButtonBase-root {
    padding: 5px 10px 5px 10px;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary}50;
    }
  }
`;

export const UserMenuRow = styled(RowContainer)`
  width: 100%;
  padding: 0px 10px 0px 10px;
`;

export const UserInfoColumn = styled(ColumnContainer)`
  justify-content: flex-start;
  margin-left: 10px;
`;

export const UserName = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.smaller};
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  font-weight: 1000;
`;

export const UserRole = styled(Text)`
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  font-size: ${(props) => props.theme.fontSize.smaller};
  word-break: break-all;
`;

export const MenuItemText = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.colors.greyWhiteInverter};
`;

export const MenuProfileIcon = styled(LiaUserCheckSolid)`
  font-size: 20px;
  color: ${(props) => props.theme.colors.greyWhiteInverter};
  margin-right: 10px;
`;

export const LogoutIcon = styled(TbLogout)`
  font-size: 20px;
  color: ${(props) => props.theme.colors.greyWhiteInverter};
  margin-right: 10px;
`;

export const StyledMenuItem = styled(MenuItem)<{themeDark: boolean}>`
  &:hover ${MenuItemText} {
    color: ${(props) => (props.themeDark ? props.theme.colors.white : props.theme.colors.primary)};
  }

  &:hover ${MenuProfileIcon} {
    color: ${(props) => (props.themeDark ? props.theme.colors.white : props.theme.colors.primary)};
  }

  &:hover ${LogoutIcon} {
    color: ${(props) => (props.themeDark ? props.theme.colors.white : props.theme.colors.primary)};
  }
`;

export const FilialMenuRow = styled(RowContainer)`
  cursor: pointer;
  justify-content: flex-start;
  margin-right: 15px;
`;

export const FilialMenuText = styled(Text)<{margin?: number}>`
  color: ${(props) => props.theme.colors.greyWhiteInverter};
  font-size: ${(props) => props.theme.fontSize.smaller};
  margin-right: ${(props) => props.margin ?? 0}px;
`;

export const FilialModalText = styled(Text)`
  color: ${(props) => props.theme.colors.greyWhiteInverter};
  font-size: ${(props) => props.theme.fontSize.smaller};
`;

export const FilialModalRow = styled(RowContainer)<{themeDark: boolean}>`
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary}50;
  }
  &:hover ${FilialModalText} {
    color: ${(props) => (props.themeDark ? props.theme.colors.white : props.theme.colors.primary)};
  }
`;
