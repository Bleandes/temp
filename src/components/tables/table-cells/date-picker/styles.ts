import styled from 'styled-components';

export const TextInput = styled(styled.input``)`
  background-color: transparent;
  border: none;
  width: calc(100% - 0px);
  min-height: 100%;
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  font-weight: 400;
  color-scheme: ${(props) => props.theme.schema};
`;
