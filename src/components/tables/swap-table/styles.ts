import styled from 'styled-components';
import {ColumnContainer, RowContainer} from '#components/styled-containers';
import {Text} from '#components/text';

export const LeftColumn = styled(ColumnContainer)<{
  width?: string;
}>`
  align-items: flex-start;
  justify-content: flex-start;
  width: ${(props) => props.width ?? '45%'};
  margin: 10px 0px 10px 5px;
`;

export const RightColumn = styled(ColumnContainer)<{
  width?: string;
}>`
  align-items: flex-start;
  justify-content: flex-end;
  width: ${(props) => props.width ?? '45%'};
  margin: 10px 5px 10px 0px;
`;

export const MidColumn = styled(ColumnContainer)`
  align-items: center;
  justify-content: center;
  width: 10%;
  margin: 10px 5px 10px 5px;
  height: 452px;
  gap: 20px;
`;

export const DividerColumnUpper = styled(RowContainer)`
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 50%;
`;

export const DividerColumnLower = styled(RowContainer)`
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 50%;
`;

export const TableView = styled(RowContainer)<{
  viewHeight?: string;
  margin?: string;
  viewWidth?: string;
}>`
  width: ${(props) => props.viewWidth ?? '100%'};
  height: ${(props) => props.viewHeight ?? '450px'};
  margin: ${(props) => props.margin ?? '0px'};
`;

export const TitleTextView = styled(Text)<{
  color?: string;
}>`
  font-size: ${(props) => props.theme.fontSize.big};
  color: ${(props) => props.theme.colors.primary};
  font-weight: 800;
  position: left;
  justify-content: flex-start;
`;
