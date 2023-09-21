import styled from 'styled-components';
import {Text} from '#components/text';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Currency = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.smaller};
  margin-right: 5px;
`;

export const TextInput = styled(styled.input``)<{textAlignDirection?: string}>`
  ::placeholder {
    font-weight: 400;
    opacity: 0.7;
    color: ${(props) => props.theme.colors.grey};
    font-size: ${(props) => props.theme.fontSize.default};
  }
  background-color: transparent;
  border: none;
  width: calc(100% - 0px);
  height: calc(100% - 16px);
  color: ${(props) =>
    props.disabled ? props.theme.colors.grey : props.theme.colors.blackWhiteInverter};
  font-weight: 400;
  text-align: ${(props) => props.textAlignDirection ?? 'left'};
`;
