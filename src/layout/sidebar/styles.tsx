import Radio from '@mui/material/Radio';
import {BsDot} from 'react-icons/bs';
import {FiChevronDown, FiChevronUp, FiSearch} from 'react-icons/fi';
import {LuCircle, LuCircleDot} from 'react-icons/lu';
import {MdKeyboardArrowRight} from 'react-icons/md';
import styled from 'styled-components';
import {css} from 'styled-components';
import {RowContainer} from '#components/styled-containers';
import {Text} from '#components/text';
import {blackOrWhite, hexToRgbSingleString} from '#helper/black-or-white';

const sharedRowStyles = () => css<{selected?: boolean; categoria?: boolean; programa?: boolean}>`
  padding: 5px 10px 5px 10px;
  width: ${(props) => (props.categoria ? '95' : props.programa ? '90' : '100')}%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid transparent;
  justify-content: flex-start;
  cursor: pointer;
  margin-top: 5px;
  height: 40px;
  z-index: 1;
  overflow: visible;
  box-shadow: ${(props) =>
    props.selected ? `rgba(${hexToRgbSingleString(props.theme.colors.primary)}, 0.48) 0px 2px 6px` : 'none'};
  background: ${(props) =>
    props.selected
      ? `linear-gradient(72.47deg, rgb(${hexToRgbSingleString(
          props.theme.colors.primary,
        )}) 22.16%, rgba(${hexToRgbSingleString(props.theme.colors.primary)}, 0.7) 76.47%)`
      : props.theme.colors.backgroundColor};

  &:hover {
    ${(props) => !props.selected && `background-color: ${props.theme.colors.lightGreyAlfa}`};
  }
`;

const sharedTextStyled = () => css<{selected?: boolean}>`
  color: ${(props) =>
    blackOrWhite(
      props.selected ? props.theme.colors.primary : props.theme.colors.backgroundColor,
      props.theme.colors.grey,
    )};
  font-size: ${(props) => props.theme.fontSize.smaller};
  margin-left: 10px;
  width: 100%;
  text-align: left;
  white-space: nowrap;
`;

export const ImageBanner = styled(styled.img``)`
  width: 190px;
  height: 35px;
`;
export const ImageLogo = styled(styled.img``)`
  width: 40px;
  height: 40px;
`;
export const HeaderContainer = styled(RowContainer)``;
export const PinRadio = styled(Radio)``;
export const Circle = styled(LuCircle)``;
export const CircleDot = styled(LuCircleDot)``;
export const SearchContainer = styled(RowContainer)``;
export const SmallerSearchContainer = styled(RowContainer)``;
export const WrapperSmallerSearchContainer = styled(RowContainer)``;
export const Search = styled(styled.input``)``;
export const WrapperFilteredContainer = styled(RowContainer)``;
export const ModuloRow = styled(styled.button``)<{selected?: boolean}>`
  ${sharedRowStyles()};
`;
export const SmallerModuloRow = styled(styled.button``)<{selected?: boolean}>`
  ${sharedRowStyles()};
`;
export const CategoriaRow = styled(styled.button``)<{selected?: boolean; categoria?: boolean}>`
  ${sharedRowStyles()};
`;
export const ProgramaRow = styled(styled.button``)<{selected?: boolean; programa?: boolean}>`
  position: relative;
  ${sharedRowStyles()};
`;

export const MenuWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 5px;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.white};
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.grey};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.grey}c0;
  }
`;

export const MenuSidebar = styled(styled.div``)<{pinned: boolean}>`
  &:hover {
    width: 250px;
    min-width: 250px;
    transition: 0.3s all ease-out;
  }
  z-index: 999;
  position: ${(props) => (props.pinned ? 'relative' : 'absolute')};
  width: ${(props) => (props.pinned ? '250' : '80')}px;
  min-width: ${(props) => (props.pinned ? '250' : '80')}px;
  padding: 0px 12px 0px 12px;
  background: ${(props) => props.theme.colors.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  transition: 0.3s all ease-out;
  border-right: 1px solid ${(props) => props.theme.colors.lightGrey};

  &:hover ${HeaderContainer} {
    justify-content: space-between;
  }
  & ${HeaderContainer} {
    width: 100%;
    justify-content: ${(props) => (props.pinned ? 'space-between' : 'center')};
    align-items: center;
    background-color: ${(props) => props.theme.colors.backgroundColor};
    min-height: 80px;
    transition: 0.2s;
    overflow: hidden;
  }

  &:hover ${ImageLogo} {
    display: none;
  }
  & ${ImageLogo} {
    display: ${(props) => (props.pinned ? 'none' : 'initial')};
  }

  &:hover ${ImageBanner} {
    display: initial;
  }
  & ${ImageBanner} {
    display: ${(props) => (props.pinned ? 'initial' : 'none')};
  }

  &:hover ${Circle} {
    display: initial;
  }
  & ${Circle} {
    font-size: 15px;
    display: ${(props) => (props.pinned ? 'initial' : 'none')};
    color: ${(props) => props.theme.colors.greyWhiteInverter};
    cursor: pointer;
  }

  &:hover ${CircleDot} {
    display: initial;
  }
  & ${CircleDot} {
    font-size: 15px;
    display: ${(props) => (props.pinned ? 'initial' : 'none')};
    color: ${(props) => props.theme.colors.greyWhiteInverter};
    cursor: pointer;
  }

  &:hover ${SearchContainer} {
    display: flex;
  }
  & ${SearchContainer} {
    display: ${(props) => (props.pinned ? 'flex' : 'none')};
    width: 100%;
    max-height: 30px;
    padding: 10px;
    border-radius: 50px;
    background-color: ${(props) => props.theme.colors.lightGrey};
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
    justify-content: 'flex-start';
  }

  &:hover ${WrapperFilteredContainer} {
    display: flex;
  }
  & ${WrapperFilteredContainer} {
    display: ${(props) => (props.pinned ? 'flex' : 'none')};
    width: 100%;
    align-items: center;
    justify-content: flex-start;
  }

  & ${SmallerSearchContainer} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 35px;
    min-height: 35px;
    border-radius: 100%;
    background-color: ${(props) => props.theme.colors.lightGrey};
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  }

  & ${Search} {
    width: 100%;
    border: 1px solid transparent;
    margin-left: 10px;
    background: transparent;
    color: ${(props) => props.theme.colors.blackWhiteInverter};
    ::placeholder {
      font-weight: 400;
      opacity: 0.7;
      color: ${(props) => props.theme.colors.greyWhiteInverter};
      font-size: ${(props) => props.theme.fontSize.smaller};
    }
  }

  &:hover ${WrapperSmallerSearchContainer} {
    display: none;
  }
  & ${WrapperSmallerSearchContainer} {
    width: 100%;
    justify-content: center;
    align-items: center;
    display: ${(props) => (props.pinned ? 'none' : 'flex')};
  }

  &:hover ${MenuWrapper} {
    padding-right: 5px;
  }
  & ${MenuWrapper} {
    padding-right: ${(props) => (props.pinned ? 5 : 0)}px;
  }

  &:hover ${ModuloRow} {
    display: flex;
  }
  & ${ModuloRow} {
    display: ${(props) => (props.pinned ? 'flex' : 'none')};
  }

  &:hover ${SmallerModuloRow} {
    display: none;
  }
  & ${SmallerModuloRow} {
    display: ${(props) => (props.pinned ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
  }

  &:hover ${CategoriaRow} {
    display: flex;
  }
  & ${CategoriaRow} {
    display: ${(props) => (props.pinned ? 'flex' : 'none')};
    margin-left: 5%;
  }

  &:hover ${ProgramaRow} {
    display: flex;
  }
  & ${ProgramaRow} {
    display: ${(props) => (props.pinned ? 'flex' : 'none')};
    margin-left: 10%;
  }
`;

export const FilteredRow = styled.button`
  border: 1px solid transparent;
  background-color: transparent;
  padding: 2px 5px 2px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 5px;
  margin-top: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightGreyAlfa};
  }
`;

export const FilteredContainer = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColor};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FilteredText = styled(Text)`
  text-align: left;
  font-size: ${(props) => props.theme.fontSize.smaller};
  color: ${(props) => props.theme.colors.greyWhiteInverter};
`;

export const SearchIcon = styled(FiSearch)<{color?: string}>`
  color: ${(props) => props.theme.colors.white};
  font-size: 20px;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)<{color: string}>`
  color: ${(props) => props.theme.colors.white};
  font-size: 25px;
`;

export const ArrowUp = styled(FiChevronUp)<{color: string}>`
  color: ${(props) => props.theme.colors.white};
  font-size: 25px;
`;

export const ArrowDown = styled(FiChevronDown)`
  color: ${(props) => props.theme.colors.white};
  font-size: 25px;
`;

export const ModuloText = styled(Text)<{selected?: boolean}>`
  ${sharedTextStyled()}
`;

export const CategoriaText = styled(Text)<{selected?: boolean}>`
  ${sharedTextStyled()}
`;

export const ProgramaText = styled(Text)<{selected?: boolean}>`
  ${sharedTextStyled()}
`;

export const Dot = styled(BsDot)<{color: string}>`
  position: absolute;
  color: color;
  font-size: 30px;
  left: -7px;
`;
