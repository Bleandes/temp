import {PropsWithChildren} from 'react';
import * as S from './styles';
import {TextProps} from './types';

export function Text(props: PropsWithChildren<TextProps>) {
  return <S.StyledText {...props}>{props.children}</S.StyledText>;
}
