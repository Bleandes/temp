import {ReactElement, useState} from 'react';
import {DefaultButton} from '#components/default-button';
import {ButtonType} from '#components/default-button/types';
import {getErrorMessage} from '#errors/errors-map';
import {useTranslate} from '#hooks/use-translate';
import * as S from './styles';
import {ErrorModalProps} from './types';

const defaultTitleRoute = 'components.errorModal.defaultTitle';
const defaultMessageRoute = 'components.errorModal.defaultMessage';
let showHandler: (props?: ErrorModalProps) => void;
let hideHandler: () => void;

function ErrorModal(): ReactElement | null {
  const {translate} = useTranslate();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [onClose, setOnClose] = useState(() => () => {});

  showHandler = function (props?: ErrorModalProps) {
    setShowModal(true);
    setMessage(
      props?.code
        ? translate(getErrorMessage(props.code) ?? '')
        : props?.message
        ? translate(props?.message)
        : translate(defaultMessageRoute),
    );
    setTitle(props?.title ? translate(props?.title) : translate(defaultTitleRoute));
    setOnClose(props?.onClose ? () => props.onClose : () => {});
  };

  hideHandler = function () {
    onClose && onClose();
    setShowModal(false);
    setMessage(translate(defaultMessageRoute));
    setTitle(translate(defaultTitleRoute));
    setOnClose(() => {});
  };

  if (!showModal) return null;

  return (
    <S.BackgroundView>
      <S.ModalView>
        <S.StyledTitle>{title}</S.StyledTitle>
        <S.Spacer />
        <S.StyledMessage>{translate(message)}</S.StyledMessage>
        <DefaultButton type={ButtonType.confirm} marginTop={15} onClick={() => hideHandler()} />
      </S.ModalView>
    </S.BackgroundView>
  );
}

export function useErrorModal() {
  return {
    Component: ErrorModal,
    show: (props?: ErrorModalProps) => showHandler(props),
    hide: () => hideHandler(),
  };
}
