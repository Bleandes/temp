import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';

export const PaginationView = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`;

export const StyledPagination = styled(Pagination)`
  & .MuiButtonBase-root {
    color: ${(props) => props.theme.colors.greyWhiteInverter};
    border-color: ${(props) => props.theme.colors.greyWhiteInverter};
  }
`;
