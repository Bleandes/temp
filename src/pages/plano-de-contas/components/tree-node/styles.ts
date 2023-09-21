import {ColumnContainer} from '#components/styled-containers';
import {Text} from '#components/text';
import {AiOutlineFolder, AiOutlineFolderOpen} from 'react-icons/ai';
import {BsDot} from 'react-icons/bs';
import styled from 'styled-components';

export const NodeWrapper = styled(styled.button``)`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 30px;
`;

export const NodeText = styled(Text)`
  margin-right: 10px;
  margin-left: 10px;
`;

export const TreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: transparent;
  margin-top: 15px;
  width: 100%;
`;

export const ClosedFolder = styled(AiOutlineFolderOpen)`
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  font-size: 25px;
  margin-left: 7px;
`;

export const OpenedFolder = styled(AiOutlineFolder)`
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  font-size: 25px;
  margin-left: 7px;
`;

export const HorizontalPipe = styled.div`
  background-color: ${(props) => props.theme.colors.blackWhiteInverter};
  width: 15px;
  height: 1px !important;
  position: relative;
`;

export const Dot = styled(BsDot)`
  position: absolute;
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  font-size: 36px;
  top: -17px;
  left: -5px;
`;

export const BorderHider = styled(styled.div``)<{height?: number}>`
  position: absolute;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  height: ${(props) => props.height ?? 15}px;
  width: 15px;
  z-index: 10;
  left: -7px;
  top: 1px;
`;

export const ChildrenWrapper = styled(ColumnContainer)<{
  marginLeft?: number;
  lastChildren?: boolean;
}>`
  margin-left: ${(props) => props.marginLeft ?? 15}px;
  align-items: flex-start;
  border-left: 1px solid ${(props) => (props.lastChildren ? 'transparent' : props.theme.colors.blackWhiteInverter)};
  position: relative;
  z-index: 1;
`;
