import {Text} from '#components/text';
import styled from 'styled-components';

export const CheckBox = styled.input`
  width: 18px;
  height: 18px;
`;

export const CheckBoxClickableView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const CheckBoxText = styled(Text)<{readonly?: boolean}>`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) =>
    props.readonly ? props.theme.colors.grey : props.theme.colors.blackWhiteInverter};
  margin-left: 5px;
`;
