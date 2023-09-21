import {ThemeProvider, createTheme} from '@mui/material';
import {useTheme} from 'styled-components';
import {PaginationProps} from '../types';
import * as S from './styles';

export function PaginationComponent(props: PaginationProps) {
  const globalTheme = useTheme();

  const theme = createTheme({
    palette: {
      primary: {
        main: globalTheme.colors.primary,
      },
      text: {
        primary: globalTheme.colors.blackWhiteInverter,
      },
    },
  });

  return (
    <S.PaginationView>
      <ThemeProvider theme={theme}>
        <S.StyledPagination
          page={props.page}
          count={props.totalPages}
          onChange={(e, p) => props.onPageChange(p)}
          variant="outlined"
          color={'primary'}
        />
      </ThemeProvider>
    </S.PaginationView>
  );
}
