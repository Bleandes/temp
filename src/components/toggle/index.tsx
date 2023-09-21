import * as S from './styles';
import {ToggleProps} from './types';

export function Toggle(props: ToggleProps) {
  return (
    <S.ToggleContainer>
      <S.ToggleTheme icons={false} checked={props.value} onClick={props.onChange} />
    </S.ToggleContainer>
  );
}
