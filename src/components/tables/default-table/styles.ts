import Save from '@mui/icons-material/Save';
import {Box} from '@mui/material';
import {DataGridPro} from '@mui/x-data-grid-pro';
import styled from 'styled-components';
import {RowContainer} from '#components/styled-containers';

export const TableView = styled(styled.div``)<{
  viewHeight?: string;
  margin?: string;
  viewWidth?: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: ${(props) => props.viewWidth ?? '100%'};
  height: ${(props) => props.viewHeight ?? '450px'};
  margin: ${(props) => props.margin ?? '0px'};
`;

export const TableContainer = styled(Box)<{
  tableHeight?: string;
}>`
  width: 100%;
  height: ${(props) => props.tableHeight ?? '100%'};
`;

export const StyledDataGrid = styled(DataGridPro)<{
  cellBackgroundColor?: string;
}>`
  .MuiSvgIcon-root {
    color: ${(props) => props.theme.colors.greyWhiteInverter};
  }

  .MuiDataGrid-columnHeaderTitle {
    color: ${(props) => props.theme.colors.blackWhiteInverter};
  }

  .MuiDataGrid-cellContent {
    color: ${(props) => props.theme.colors.blackWhiteInverter};
  }

  .MuiDataGrid-cell {
    background-color: ${(props) => props.cellBackgroundColor ?? 'transparent'};
  }

  & .MuiDataGrid-pinnedColumnHeaders {
    background-color: ${(props) =>
      props.cellBackgroundColor ?? props.theme.colors.darkGreyWhiteInverter};
  }

  & .MuiDataGrid-pinnedColumns {
    background-color: ${(props) =>
      props.cellBackgroundColor ?? props.theme.colors.darkGreyWhiteInverter};
  }
`;

export const PaginationRow = styled(RowContainer)`
  position: relative;
  width: 100%;
  justify-content: space-between;
  min-height: 60px;
`;

export const PaginationWrapper = styled(RowContainer)`
  justify-content: flex-end;
  min-height: 60px;
  width: 100%;
`;

export const DefaultTableWrapper = styled(styled.div``)<{
  tableHeight?: number;
  topMargin?: number;
  bottomMargin?: number;
}>`
  height: ${(props) => props.tableHeight ?? 450}px;
  width: 100%;
  margin-bottom: ${(props) => props.bottomMargin ?? 0}px;
  margin-top: ${(props) => props.topMargin ?? 0}px;
`;

export const SaveButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SaveIcon = styled(Save)`
  color: ${(props) => props.theme.colors.blackWhiteInverter};
`;

export const SpeedDialWrapper = styled(styled.div``)<{hidePagination?: boolean}>`
  position: absolute;
  z-index: 1;
  bottom: ${(props) => (props.hidePagination ? '-55px' : '5px')};
  display: flex;
  align-items: center;
  justify-content: center;
`;
