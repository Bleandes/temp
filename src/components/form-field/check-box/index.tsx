import {useTranslate} from '#hooks/use-translate';
import List from '@mui/joy/List';
import {CheckBoxProps} from './types';
import {useTheme} from 'styled-components';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {FormHelperText} from '@mui/material';

export function CheckBox(props: CheckBoxProps) {
  const theme = useTheme();
  const {translate} = useTranslate();

  return (
    <List
      component="div"
      variant="outlined"
      sx={{
        borderRadius: 'sm',
        borderColor: theme.colors.greyWhiteInverter,
        width: '100%',
        minWidth: props.minWidth,
      }}
    >
      <FormControlLabel
        sx={{
          minWidth: '15rem',
          padding: '0.8px 16px',
          '& .MuiFormControlLabel-label': {
            color: theme.colors.greyWhiteInverter,
          },
        }}
        disabled={props.readonly}
        checked={props.value}
        onClick={props.onMouseClick}
        control={
          <Checkbox
            sx={{
              color: theme.colors.greyWhiteInverter,
              '&.Mui-checked': {
                color: theme.colors.primary,
              },
            }}
            defaultChecked
          />
        }
        label={translate(props.name ?? '')}
      />
      {/* {props.error && (
        <FormHelperText
          sx={{
            position: 'absolute',
            top: '3.4rem',
            color: theme.colors.red,
          }}
        >
          Campo de preenchimento obrigatório.
        </FormHelperText>
      )} */}
    </List>
  );
}
