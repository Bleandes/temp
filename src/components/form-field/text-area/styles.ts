import styled from 'styled-components';

export const TextArea = styled.textarea`
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
  resize: none;
`;
