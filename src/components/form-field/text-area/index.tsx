import {ChangeEvent} from 'react';
import * as S from './styles';
import {TextAreaProps} from './types';

export function TextArea(props: TextAreaProps) {
  function handleOnChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
    props.onChange(event.target.value);
  }

  return (
    <S.TextArea
      onChange={handleOnChangeText}
      value={props.value ?? ''}
      disabled={props.readonly}
      placeholder={props.placeHolder}
      autoFocus={props.autoFocus}
      maxLength={props.maxSize}
      rows={props.rows ?? 4}
    />
  );
}
