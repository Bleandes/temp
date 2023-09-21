import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {useTranslate} from '#hooks/use-translate';
import {useSharedSx} from '../styles';
import {DropDownProps} from './types';

export function DropDown(props: DropDownProps) {
  if (!props.filterBy) return null;
  const {translate} = useTranslate();
  const theme = useTheme();
  const {textInputSx} = useSharedSx();
  const [value, setValue] = useState<string | null | undefined>(props.value && props.value[props.filterBy]);
  const [data, setData] = useState(generateData());

  function generateData() {
    let data: string[] = [];
    props.data?.forEach((element: any) => {
      data.push(element[props.filterBy]);
    });
    return data;
  }

  useEffect(() => {
    setData(generateData());
  }, [props.data]);

  useEffect(() => {
    setValue(props.value ? props.value[props.filterBy] : null);
  }, [props.value]);

  return (
    <Tooltip title={value}>
      <Autocomplete
        value={value}
        options={data}
        fullWidth
        disabled={props.readonly}
        onChange={(event: any, newValue: string | null) => {
          const originalItem = props.data?.filter((e: any) => e[props.filterBy] === newValue);
          if (originalItem && originalItem.length > 0) {
            props.onChange(originalItem[0]);
          } else {
            props.onChange(undefined);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            sx={textInputSx(props.readonly, props.required)}
            error={!!props.error && props.error !== ''}
            helperText={props.error}
          />
        )}
        sx={{
          '& .MuiSvgIcon-root': {
            color: theme.colors.greyWhiteInverter,
          },
        }}
        noOptionsText={translate('components.formField.errors.noOptions')}
      />
    </Tooltip>
  );
}
