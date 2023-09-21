import styled from 'styled-components';
import {RowContainer} from '../styled-containers';
import {Text} from '../text';

export const StyledRow = styled(RowContainer)`
  margin-top: 10px;
`;

export const Tab = styled(styled.div``)<{isSelected: boolean}>`
  border-bottom: 3px solid
    ${(props) =>
      props.isSelected ? props.theme.colors.blackWhiteInverter : props.theme.colors.lightGreyAlfa};
  min-width: 50px;
  padding: 10px;
  cursor: pointer;
`;

export const StyledTabName = styled(Text)<{isSelected: boolean}>`
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.blackGreyInverter
      : props.theme.colors.blackWhiteInverter};
  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
`;
