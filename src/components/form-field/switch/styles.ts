import Switch from '@mui/material/Switch';
import styled from 'styled-components';
import {Text} from '#components/text';

interface SwitchTextProps {
  readonly?: boolean;
}

interface SwitchColor {
  switchColor: string;
}

export const StyledSwitch = styled(Switch)<SwitchColor>(({theme, switchColor}) => ({
  '& .MuiSwitch-switchBase + .MuiSwitch-track': {
    backgroundColor: theme.colors.blackWhiteInverter,
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: switchColor == '' ? theme.colors.primary : switchColor,
  },
  '& .MuiSwitch-switchBase.Mui-checked.Mui-disabled': {
    color: switchColor == '' ? theme.colors.primary : switchColor,
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: switchColor == '' ? theme.colors.primary : switchColor,
  },
}));

export const SwitchText = styled(Text)<SwitchTextProps>`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) =>
    props.readonly ? props.theme.colors.grey : props.theme.colors.blackWhiteInverter};
  margin-left: 5px;
`;

export const SwitchClickableView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
