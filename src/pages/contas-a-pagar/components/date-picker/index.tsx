import {useEffect, useState} from 'react';
import * as S from './styles';
import {IDuplicatasContasAPagar} from '#pages/contas-a-pagar/types';

interface TableDatePickerProps {
  initialValue: IDuplicatasContasAPagar;
  onChange: (duplicatas: IDuplicatasContasAPagar[]) => void;
  emissao: string;
  duplicatas: IDuplicatasContasAPagar[];
}

export function TableDatePicker(props: TableDatePickerProps) {
  const [date, setDate] = useState('');

  useEffect(() => {
    if (!props.initialValue) return;
    setDate(props.initialValue.dataVencimento);
  }, [props.initialValue]);

  function onChange(value: string) {
    const newDuplicatas = [...props.duplicatas];
    newDuplicatas[parseFloat(props.initialValue.id ?? '0') - 1].dataVencimento = value;
    props.onChange(newDuplicatas);
    setDate(value);
  }

  return <S.TextInput value={date} onChange={(e) => onChange(e.target.value)} type="date" />;
}
