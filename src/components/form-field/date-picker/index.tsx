import {DatePickerProps} from './types';
import TextField from '@mui/material/TextField';
import {ChangeEvent} from 'react';
import {useSharedSx} from '../styles';

export function DatePicker(props: DatePickerProps) {
  const {textInputSx} = useSharedSx();

  function handleOnChangeDate(event: ChangeEvent<HTMLInputElement>) {
    props.onChange && props.onChange(event.target.value);
  }

  function setMinDate() {
    if (props.value) {
      const split = props.value.split('-');
      if (parseInt(split[0]) < 1900) {
        props.onChange && props.onChange(`1900-${split[1]}-${split[2]}`);
      }
    }
    return undefined;
  }

  return (
    <TextField
      label={props.label}
      value={props.value ? props.value.slice(0, 10) : ''}
      onChange={handleOnChangeDate}
      disabled={props.readonly}
      fullWidth
      error={!!props.error && props.error !== ''}
      helperText={props.error}
      sx={textInputSx(props.readonly, props.required)}
      type={'date'}
      onBlur={setMinDate}
      InputLabelProps={{shrink: true}}
    />
  );
}
