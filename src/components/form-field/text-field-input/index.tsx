import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {IconButton, InputAdornment} from '@mui/material';
import {ChangeEvent, useState} from 'react';
import {useTheme} from 'styled-components';
import {useTranslate} from '#hooks/use-translate';
import * as S from './styles';
import {TextFieldProps} from './types';

export function TextFieldInput(props: TextFieldProps) {
  const theme = useTheme();
  const {translate} = useTranslate();
  const [showPassword, setShowPassword] = useState(false);

  function handleOnChangeText(event: ChangeEvent<HTMLInputElement>) {
    if (props.mask) {
      const regex = new RegExp(props.mask ?? '');
      if (!regex.test(event.target.value)) return;
    }

    props.onChange(event.target.value);
  }

  function isPasswordHandler() {
    if (props.isPassword) {
      if (showPassword) return 'text';
      return 'password';
    }
    return props.textInputType;
  }

  return (
    <S.StyledTextField
      label={translate(`${props.label}`)}
      value={props.value ?? ''}
      onChange={handleOnChangeText}
      required={props.required}
      disabled={props.readonly}
      autoFocus={props.autoFocus}
      placeholder={props.placeHolder}
      type={isPasswordHandler()}
      inputProps={{
        maxLength: props.maxSize,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {!props.isPassword ? (
                <></>
              ) : showPassword ? (
                <VisibilityOffIcon
                  style={{
                    color: props.readonly ? theme.colors.grey : theme.colors.blackWhiteInverter,
                  }}
                />
              ) : (
                <RemoveRedEyeIcon
                  style={{
                    color: props.readonly ? theme.colors.grey : theme.colors.blackWhiteInverter,
                  }}
                />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
