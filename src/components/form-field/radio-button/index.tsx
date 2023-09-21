import {ChangeEvent, useEffect, useState} from 'react';
import {RadioButtonProps} from './types';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import {useTheme} from 'styled-components';

export function RadioButton(props: RadioButtonProps) {
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState<number>(-1);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (props.readonly) return;
    const index = parseInt(event.target.value);
    props.returnIndex ? props.onChange(index) : props.onChange(props.options[index]);
  }

  useEffect(() => {
    if (typeof props.value === 'string') {
      props.options.forEach((element: string, index: number) => {
        if (element === props.value) {
          return setSelectedValue(index);
        }
      });
    }
    if (typeof props.value === 'number') setSelectedValue(props.value);
  }, [props.value]);

  return (
    <RadioGroup
      aria-labelledby="example-payment-channel-label"
      overlay
      name="example-payment-channel"
      defaultValue="Paypal"
      onChange={handleChange}
      value={selectedValue.toString()}
      sx={{
        width: '100%',
      }}
    >
      <List
        component="div"
        variant="outlined"
        sx={{
          borderRadius: 'sm',
          borderColor: theme.colors.greyWhiteInverter,
        }}
      >
        {props.options.map((value, index) => (
          <ListItem>
            <Radio
              id={index.toString()}
              value={index.toString()}
              label={value}
              disabled={props.readonly}
              sx={{
                '& .MuiRadio-icon': {
                  color: props.readonly ? theme.colors.grey : theme.colors.primary,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </RadioGroup>
  );
}
