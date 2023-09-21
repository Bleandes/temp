//ts-noCheck
import styled from 'styled-components';
import {useTheme} from 'styled-components';
import {ViewProps} from './types';

export function useSharedSx() {
  const theme = useTheme();

  function textInputSx(readonly?: boolean, required?: boolean) {
    return {
      '& .MuiInputBase-input.Mui-disabled': {
        WebkitTextFillColor: theme.colors.greyWhiteInverter,
      },
      '& .MuiInputBase-input': {
        color: readonly ? theme.colors.grey : theme.colors.greyWhiteInverter,
      },
      '& label': {
        color: required ? theme.colors.red : theme.colors.greyWhiteInverter,
      },
      '& label.Mui-focused': {
        color: required ? theme.colors.red : theme.colors.greyWhiteInverter,
      },
      '& label.Mui-disabled': {
        color: theme.colors.greyWhiteInverter,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: required ? theme.colors.red : theme.colors.greyWhiteInverter,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: required ? theme.colors.red : theme.colors.greyWhiteInverter,
        },
        '& :hover fieldset': {
          borderColor: required ? theme.colors.red : readonly ? theme.colors.greyWhiteInverter : '',
        },
        '& .Mui-focused fieldset': {
          borderColor: required ? theme.colors.red : theme.colors.greyWhiteInverter,
        },
      },
      '& .MuiInputBase-root.Mui-disabled': {
        '& fieldset': {
          borderColor: required ? theme.colors.red : theme.colors.greyWhiteInverter,
        },
      },
    };
  }

  return {textInputSx};
}

export const View = styled(styled.div``)<ViewProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: none;
  border-radius: 7px;
  min-height: ${(props) => props.minHeight}px;
  background-color: ${(props) => props.backgroundColor ?? 'transparent'};
  width: ${(props) => props.width};
  min-width: ${(props) => props.minWidth}px;
  padding: 10px 0px 10px 0px;
`;

export const FormRow = styled(styled.div``)<{
  gapSize?: string;
  alignItems?: string;
  justifyContent?: string;
  marginTop?: string;
  marginBottom?: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.alignItems ?? 'flex-start'};
  justify-content: ${(props) => props.justifyContent ?? 'flex-start'};
  width: 100%;
  flex-flow: wrap;
  ${(props) => (props.gapSize ? `gap: ${props.gapSize};` : '')}
  ${(props) => (props.marginTop ? `margin-top: ${props.marginTop};` : '')}
  ${(props) => (props.marginBottom ? `margin-bottom: ${props.marginBottom};` : '')}
`;
