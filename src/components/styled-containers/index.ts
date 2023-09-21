import styled from 'styled-components';

interface ContainerProps {
  gapSize?: string;
  width?: string;
}

export const ColumnContainer = styled(styled.div``)<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: ${(props) => props.width};
  gap: ${(props) => props.gapSize};
`;

export const RowContainer = styled(styled.div``)<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: ${(props) => props.width};
  gap: ${(props) => props.gapSize};
`;
