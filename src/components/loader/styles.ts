import styled from 'styled-components';

export const View = styled.div`
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

export const Text = styled.span`
  font-size: 22px;
  margin-top: 10px;
  color: ${(props) => props.theme.colors.secondary};
`;
