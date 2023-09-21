import {SelectChangeEvent} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import {useState} from 'react';
import {useTheme} from 'styled-components';
import * as S from './styles';
import {PageSizeProps} from './types';

export function PageSize(props: PageSizeProps) {
  const [pageSize, setPageSize] = useState(props.pageSize.toString());
  const theme = useTheme();

  function onChange(e: SelectChangeEvent) {
    setPageSize(e.target.value);
    props.onChange(parseInt(e.target.value));
  }

  return (
    <S.StyledSelect
      value={pageSize}
      onChange={(e: any) => onChange(e)}
      MenuProps={{
        sx: {
          '& .MuiList-root': {
            backgroundColor: theme.colors.backgroundColor,
          },
        },
      }}
      sx={{
        minWidth: 30,
        maxHeight: 30,
        alignItems: 'center',
        marginRight: 1,
        '& .MuiSvgIcon-root': {
          color: theme.colors.greyWhiteInverter,
        },
      }}
    >
      <MenuItem value={'10'}>
        <S.PageSizeDescription>{'10'}</S.PageSizeDescription>
      </MenuItem>
      <MenuItem value={'20'} sx={{alignItems: 'center'}}>
        <S.PageSizeDescription>{'20'}</S.PageSizeDescription>
      </MenuItem>
      <MenuItem value={'30'} sx={{alignItems: 'center'}}>
        <S.PageSizeDescription>{'30'}</S.PageSizeDescription>
      </MenuItem>
      <MenuItem value={'50'} sx={{alignItems: 'center'}}>
        <S.PageSizeDescription>{'50'}</S.PageSizeDescription>
      </MenuItem>
      <MenuItem value={'100'} sx={{alignItems: 'center'}}>
        <S.PageSizeDescription>{'100'}</S.PageSizeDescription>
      </MenuItem>
      <MenuItem value={'250'} sx={{alignItems: 'center'}}>
        <S.PageSizeDescription>{'250'}</S.PageSizeDescription>
      </MenuItem>
    </S.StyledSelect>
  );
}
