import {PropsWithChildren} from 'react';
import {DefaultButton} from '#components/default-button';
import {ButtonType} from '#components/default-button/types';
import {useTranslate} from '#hooks/use-translate';
import * as S from './styles';
import {ConfirmModalProps} from './types';

export function DefaultModal(props: PropsWithChildren<ConfirmModalProps>) {
  const {translate} = useTranslate();

  if (!props.show) return null;

  function renderModalHeader() {
    if (props.title !== '' || props.closeButton) {
      return (
        <S.Header>
          <S.StyledTitle>{translate(props.title ?? '')}</S.StyledTitle>
          <S.CloseButton onClick={() => props.onClose && props.onClose()}>
            <S.CloseIcon />
          </S.CloseButton>
        </S.Header>
      );
    }
  }

  return (
    <S.ModalBackground open={props.show}>
      <S.ModalView modalWidth={props.modalWidth ?? '400px'}>
        {renderModalHeader()}
        <S.Spacer headerMargin={props.headerMargin} />

        {props.children}
        {!props.hideButtons && (
          <S.StyledButtonRow>
            <DefaultButton
              type={ButtonType.confirm}
              onClick={props.onConfirm ? props.onConfirm : () => {}}
            />
            <DefaultButton
              type={ButtonType.cancel}
              onClick={props.onCancel ? props.onCancel : () => {}}
            />
          </S.StyledButtonRow>
        )}
      </S.ModalView>
    </S.ModalBackground>
  );
}
