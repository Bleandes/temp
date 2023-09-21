import * as S from './styles';
import {TopbarProps} from './types';
import {MenuProfile} from '../menu-profile';

export function Topbar(props: TopbarProps) {
  return (
    <S.TopBarWrapper>
      <MenuProfile />
    </S.TopBarWrapper>
  );
}
