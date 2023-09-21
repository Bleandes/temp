// @ts-nocheck
import TextField from '@mui/material/TextField';
import styled, { CSSObject } from 'styled-components';

interface TextFieldProps {
  theme: any;
  required?: boolean;
  readonly?: boolean;
}

export const StyledTextField = styled(TextField)<TextFieldProps>(({theme, required, readonly}): CSSObject => ({
  '& .MuiInputBase-input': {
    color: readonly ? theme.colors.grey : theme.colors.greyWhiteInverter,
  },
  '& label': {
    color: required ? theme.colors.red : theme.colors.blackWhiteInverter,
  },
  '& label.Mui-focused': {
    color: required ? theme.colors.red : theme.colors.blackWhiteInverter,
  },
  '& label.Mui-disabled': {
    color: theme.colors.grey,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: required ? theme.colors.red : theme.colors.blackWhiteInverter,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-disabled fieldset': {
      borderColor: theme.colors.grey,
    },
    '& fieldset': {
      borderColor: required ? theme.colors.red : theme.colors.blackWhiteInverter,
    },
    '&:hover fieldset': {
      borderColor: required ? theme.colors.red : readonly ? theme.colors.blackWhiteInverter : '',
    },
    '&.Mui-focused fieldset': {
      borderColor: required ? theme.colors.red : theme.colors.blackWhiteInverter,
    },
  },
}));
