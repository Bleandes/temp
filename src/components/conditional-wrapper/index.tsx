import {PropsWithChildren} from 'react';
import styled from 'styled-components';

interface ConditionalWrapperProps {
  show: boolean;
  forceWidth?: string;
  forceHeight?: string;
}

const Wrapper = styled(styled.div``)<{width?: string; height?: string}>`
  ${(props) => (props.width ? `width: ${props.width};` : '')}
  ${(props) => (props.height ? `width: ${props.height};` : '')}
`;

export function ConditionalWrapper(props: PropsWithChildren<ConditionalWrapperProps>) {
  return (
    <Wrapper width={props.forceWidth} height={props.forceHeight}>
      {props.show ? props.children : undefined}
    </Wrapper>
  );
}
