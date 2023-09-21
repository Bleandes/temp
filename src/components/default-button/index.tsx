//@ts-nocheck
import {useTranslate} from '#hooks/use-translate';
import * as S from './styles';
import {ButtonType, DefaultButtonProps} from './types';

export function DefaultButton(props: DefaultButtonProps) {
  const {translate} = useTranslate();
  return (
    <S.ButtonStyled
      buttonType={props.type}
      onClick={() => props.onClick && props.onClick()}
      {...props}
    >
      <S.ButtonText>
        {translate(
          props.text
            ? props.text
            : props.type === ButtonType.cancel
            ? 'components.buttons.cancel'
            : props.type === ButtonType.confirm
            ? 'components.buttons.confirm'
            : props.type === ButtonType.include
            ? 'components.buttons.include'
            : props.type === ButtonType.back
            ? 'components.buttons.back'
            : props.type === ButtonType.filter
            ? 'components.buttons.filter'
            : props.type === ButtonType.remove
            ? 'components.buttons.remove'
            : 'components.buttons.save',
        )}
      </S.ButtonText>
    </S.ButtonStyled>
  );
}
