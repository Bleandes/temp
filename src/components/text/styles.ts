import styled from 'styled-components';
import {TextProps} from './types';

export const StyledText = styled(styled.span``)<TextProps>`
  font-size: ${(props) => props.size ?? props.theme.fontSize.default};
  color: ${(props) => props.color ?? props.theme.colors.greyWhiteInverter};
`;
