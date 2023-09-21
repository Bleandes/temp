import {useEffect, useState} from 'react';
import * as S from './styles';

interface TableCellDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  readonly?: boolean;
}

export function TableCellDatePicker(props: TableCellDatePickerProps) {
  const [date, setDate] = useState('');

  useEffect(() => {
    if (!props.value) return;
    setDate(props.value);
  }, [props.value]);

  function onChange(value: string) {
    props.onChange(value);
    setDate(value);
  }

  return (
    <S.TextInput
      value={date}
      onChange={(e) => onChange(e.target.value)}
      type="date"
      readOnly={props.readonly ?? false}
    />
  );
}
