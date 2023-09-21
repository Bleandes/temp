import styled from 'styled-components';
import {Text} from '../text';

export const ColorButton = styled(styled.button``)<{bgColor: string}>`
  width: 130px;
  height: 30px;
  border-radius: 5px;
  background-color: ${(props) => props.bgColor};
  border: none;
`;

export const ButtonText = styled(Text)<{textColor: string}>`
  color: ${(props) => props.textColor};
`;

export const LeftText = styled(Text)`
  margin-right: 15px;
`;
