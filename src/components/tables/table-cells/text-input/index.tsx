import {ChangeEvent, useEffect, useState} from 'react';
import {formatInfinityDecimal, formatMoney} from '#helper/formatters';
import {useGlobalContext} from '#hooks/use-global-context';
import * as S from './styles';
import {TableCellTextInputProps} from './types';

export function TableCellTextInput(props: TableCellTextInputProps) {
  const context = useGlobalContext();
  const [internalValue, setInternalValue] = useState('');

  useEffect(() => {
    if (!props.value) return;
    if (props.numberFormatterTwoDecimal) {
      setInternalValue(formatMoney(props.value));
    } else if (props.numberFormatterInfinityDecimal) {
      setInternalValue(formatInfinityDecimal(props.value, props.maxDecimal, props.maxInteger));
    } else {
      setInternalValue(props.value);
    }
  }, [props.value]);

  function handleOnChangeText(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (props.numberFormatterTwoDecimal) {
      let newValue = formatMoney(event.target.value);
      const splited = newValue.split(',');
      setInternalValue(newValue);
      props.onChange(`${splited[0].replaceAll('.', '')}.${splited[1]}`);
    } else if (props.numberFormatterInfinityDecimal) {
      setInternalValue(
        formatInfinityDecimal(event.target.value, props.maxDecimal, props.maxInteger),
      );
      props.onChange(formatInfinityDecimal(event.target.value, props.maxDecimal, props.maxInteger));
    } else {
      setInternalValue(event.target.value);
      props.onChange(event.target.value);
    }
  }

  return (
    <S.Wrapper>
      {props.currency && internalValue !== '' && (
        <S.Currency>{context.getPersistValue('currency')}</S.Currency>
      )}
      <S.TextInput
        type={props.textInputType}
        onChange={handleOnChangeText}
        value={internalValue}
        disabled={props.readonly}
        placeholder={props.placeHolder}
        maxLength={props.maxSize}
        textAlignDirection={props.textAlignDirection}
      />
    </S.Wrapper>
  );
}
