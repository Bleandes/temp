import TextField from '@mui/material/TextField';
import {ChangeEvent, useState} from 'react';
import {useSharedSx} from '../styles';
import {TextInputProps} from './types';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import {useTheme} from 'styled-components';
import Tooltip from '@mui/material/Tooltip';

export function TextInput(props: TextInputProps) {
  const theme = useTheme();
  const {textInputSx} = useSharedSx();
  const [showPassword, setShowPassword] = useState(false);

  function handleOnChangeText(event: ChangeEvent<HTMLInputElement>) {
    if (props.mask) {
      const regex = new RegExp(props.mask ?? '');
      if (!regex.test(event.target.value)) return;
    }

    props.onChange(event.target.value);
  }

  function textType() {
    if (props.isPassword && !showPassword) return 'password';
    if (props.textInputType) return props.textInputType;
    return 'text';
  }

  return (
    <Tooltip title={props.value ?? ''}>
      <TextField
        label={props.label}
        onChange={handleOnChangeText}
        value={props.value ?? ''}
        autoFocus={props.autoFocus}
        placeholder={props.placeHolder}
        disabled={props.readonly}
        inputProps={{
          maxLength: props.maxSize,
        }}
        fullWidth
        error={!!props.error && props.error !== ''}
        helperText={props.error}
        sx={textInputSx(props.readonly, props.required)}
        type={textType()}
        InputProps={{
          endAdornment: (
            <>
              {props.isPassword && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{'& .MuiSvgIcon-root': {color: theme.colors.greyWhiteInverter}}}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
            </>
          ),
        }}
      />
    </Tooltip>
  );
}
