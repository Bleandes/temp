import {useTheme} from 'styled-components';
import {FilterProps} from '../types';
import * as S from './styles';

export function Filter(props: FilterProps) {
  const theme = useTheme();
  return (
    <S.FilterView>
      <S.SearchIcon />
      <S.SearchInput
        type="text"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeHolder}
      />
      {/* {props.value !== '' && (
        <X
          size={15}
          cursor="pointer"
          onClick={() => props.onChange('')}
          color={theme.colors.blackWhiteInverter}
        />
      )} */}
    </S.FilterView>
  );
}
