import styled from 'styled-components';
import {Text} from '#components/text';

interface CheckBoxTextProps {
  readonly?: boolean;
}

export const CheckBox = styled.input``;

export const CheckBoxClickableView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const CheckBoxText = styled(Text)<CheckBoxTextProps>`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) =>
  props.readonly ? props.theme.colors.grey : props.theme.colors.blackWhiteInverter};
  margin-left: 5px;
`;
