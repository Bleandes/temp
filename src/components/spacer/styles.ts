import styled from 'styled-components';
import {Text} from '../text';

export const StyledSpacerRow = styled.div<{
  marginTop?: number;
  marginBottom?: number;
}>`
  margin-top: ${(props) => props.marginTop ?? 0}px;
  margin-bottom: ${(props) => props.marginBottom ?? 0}px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Line = styled.div`
  border: 1px solid ${(props) => props.theme.colors.lightGrey}C0;
  border-radius: 10px;
  flex: 1;
`;

export const StyledText = styled(Text)<{centered?: boolean}>`
  margin-right: 15px;
  ${(props) => (props.centered ? 'margin-left: 15px;' : '')}
  color: ${(props) => props.theme.colors.blackWhiteInverter};
`;
