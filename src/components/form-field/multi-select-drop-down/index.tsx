import {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {MultiSelectDropDownProps} from './types';
import {useTranslate} from '#hooks/use-translate';
import {useTheme} from 'styled-components';
import {useSharedSx} from '../styles';

export function MultiSelectDropDown(props: MultiSelectDropDownProps) {
  if (!props.filterBy) return null;
  const {translate} = useTranslate();
  const theme = useTheme();
  const {textInputSx} = useSharedSx();
  const [value, setValue] = useState<string[] | undefined>(processValue(props.value));
  const [data, setData] = useState(generateData());

  function processValue(values: any[]) {
    let data: string[] = [];
    values?.forEach((element: any) => {
      data.push(element[props.filterBy]);
    });
    return data;
  }

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
    props.value ? setValue(processValue(props.value)) : setValue(undefined);
  }, [props.value]);

  return (
    <Autocomplete
      value={value ?? []}
      options={data}
      fullWidth
      multiple
      disabled={props.readonly}
      onChange={(event: any, newValues: string[]) => {
        const originalItems = props.data?.filter((e: any) => newValues.includes(e[props.filterBy]));
        if (originalItems && originalItems.length > 0) {
          props.onChange(originalItems);
        } else {
          props.onChange(undefined);
        }
      }}
      sx={{
        maxHeight: 100,
        '& .MuiSvgIcon-root': {
          color: theme.colors.greyWhiteInverter,
        },
        '& .MuiChip-root': {
          color: theme.colors.greyWhiteInverter,
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
      noOptionsText={translate('components.formField.errors.noOptions')}
    />
  );
}
