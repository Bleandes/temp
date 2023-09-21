import {Modal} from '@mui/material';
import {IoMdClose} from 'react-icons/io';
import styled from 'styled-components';
import {RowContainer} from '#components/styled-containers';
import {Text} from '#components/text';

export const ModalBackground = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ModalView = styled(styled.div``)<{modalWidth: string}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  min-height: 200px;
  width: ${(props) => props.modalWidth};
  border-radius: 10px;
  padding: 20px;
`;

export const Header = styled(RowContainer)`
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
  width: 100%;
`;

export const StyledTitle = styled(Text)`
  color: ${(props) => props.theme.colors.greyWhiteInverter};
  text-align: center;
`;

export const Spacer = styled(styled.div``)<{headerMargin?: string}>`
  min-height: 1px;
  background-color: ${(props) => props.theme.colors.lightGrey}c0;
  border-radius: 5px;
  width: 100%;
  ${(props) => (props.headerMargin ? `margin: ${props.headerMargin};` : '')}
`;

export const StyledButtonRow = styled(RowContainer)`
  margin-top: 15px;
  gap: 15px;
`;

export const CloseButton = styled.button`
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
