import styled from 'styled-components';
import {DefaultButton} from '../default-button';
import {RowContainer} from '../styled-containers';

export const Wrapper = styled(styled.div``)<{hasTopBar?: boolean}>`
  ${(props) => (props.hasTopBar ? 'height: calc(100% - 100px);' : 'height : 100%;')}
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ScreenContainer = styled.div`
  width: 100%;
  margin-right: 0 !important;
`;

export const Footer = styled(RowContainer)<{footerMargin?: string}>`
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-height: 60px;
  padding-left: 0px !important;
  ${(props) => (props.footerMargin ? `margin: ${props.footerMargin};` : '')}
`;

export const StyledDefaultButton = styled(DefaultButton)<{marginLeft: boolean}>`
  margin-left: ${(props) => (props.marginLeft ? 10 : 0)}px;
`;

export const FormButtonsContainer = styled(RowContainer)`
  justify-content: flex-end;
  align-items: center;
  min-height: 60px;
`;

export const HeaderContainer = styled(RowContainer)`
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  min-height: 40px;
`;
