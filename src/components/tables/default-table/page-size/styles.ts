import Select from '@mui/material/Select';
import styled from 'styled-components';
import {Text} from '#components/text';

export const StyledSelect = styled(Select)``;

export const PageSizeDescription = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.smaller};
`;
