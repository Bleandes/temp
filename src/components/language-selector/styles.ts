import Select from '@mui/material/Select';
import styled from 'styled-components';
import {Text} from '../text';

export const StyledSelect = styled(Select)`
  &.MuiSelect-outlined {
    align-items: center;
  }
`;

export const RegularText = styled(Text)<{useDark?: boolean}>`
  color: ${(props) => (props.useDark ? props.theme.colors.greyWhiteInverter : props.theme.colors.black)};
  width: 100%;
`;

export const Flag = styled.img`
  width: 20px;
  height: 15px;
  margin-right: 10px;
`;
