import {useState} from 'react';
import {ColorResult, SketchPicker} from 'react-color';
import {blackOrWhite} from '#helper/black-or-white';
import {useTranslate} from '#hooks/use-translate';
import {ConditionalWrapper} from '../conditional-wrapper';
import * as S from './styles';
import {ColorPickerProps} from './types';

export const ColorPicker = (props: ColorPickerProps) => {
  const [show, setShow] = useState(false);
  const {translate} = useTranslate();

  function onChange(color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    props.setColor(color.hex);
  }

  return (
    <>
      {props.text && <S.LeftText>{translate(props.text)}</S.LeftText>}
      <S.ColorButton bgColor={props.color} onClick={() => setShow(!show)} disabled={props.disabled}>
        <S.ButtonText textColor={blackOrWhite(props.color)}>
          {props.color.toUpperCase()}
        </S.ButtonText>
      </S.ColorButton>
      <ConditionalWrapper show={show}>
        <SketchPicker color={props.color} onChange={onChange} />
      </ConditionalWrapper>
    </>
  );
};
