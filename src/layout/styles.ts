import styled from 'styled-components';

export const LayoutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow-y: hidden;
  width: 100%;
`;

export const OutletContainer = styled(styled.div``)<{pinned: boolean}>`
  width: 100%;
  height: 100vh;
  padding-left: ${(props) => (props.pinned ? 20 : 96)}px;
  padding-right: 16px;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;
