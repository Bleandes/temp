import styled from 'styled-components';
import {RowContainer} from '#components/styled-containers';
import {Text} from '#components/text';

export const BackgroundView = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.lightGrey}c0;
  height: 100vh;
  width: 100vw;
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

export const StyledTitle = styled(Text)`
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  font-size: ${(props) => props.theme.fontSize.bigger};
  text-align: center;
`;

export const StyledMessage = styled(Text)`
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  text-align: center;
`;

export const Spacer = styled.div`
  margin: 20px;
  min-height: 2px;
  background-color: ${(props) => props.theme.colors.lightGrey}c0;
  border-radius: 5px;
  width: 100%;
`;

export const StyledButtonRow = styled(RowContainer)`
  margin-top: 15px;
  gap: 15px;
`;
