import {ReactElement, useState} from 'react';
import {DefaultButton} from '#components/default-button';
import {ButtonType} from '#components/default-button/types';
import {useTranslate} from '#hooks/use-translate';
import * as S from './styles';
import {ConfirmModalProps} from './types';

const defaultTitleRoute = 'components.confirmModal.defaultTitle';
let showHandler: (props: ConfirmModalProps) => void;
let hideHandler: () => void;

function ConfirmModal(): ReactElement | null {
  const {translate} = useTranslate();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [onCancel, setOnCancel] = useState(() => () => {});
  const [content, setContent] = useState<() => JSX.Element | undefined>();
  const [hideButtons, setHideButtons] = useState(false);
  const [hideCancel, setHideCancel] = useState(false);
  const [modalWidth, setModalWidth] = useState('400px');

  showHandler = function (props: ConfirmModalProps) {
    setShowModal(true);
    setMessage(translate(props.message ?? ''));
    setTitle(props?.title ? translate(props?.title) : translate(defaultTitleRoute));
    setOnConfirm(props?.onConfirm ? () => props.onConfirm : () => {});
    setOnCancel(props?.onCancel ? () => props.onCancel : () => {});
    setContent(props?.content ? () => props.content : undefined);
    setHideButtons(!!props.hideButtons);
    setModalWidth(props.modalWidth ? props.modalWidth : '400px');
    setHideCancel(props.hideCancel ?? false);
  };

  function hideHandler() {
    setShowModal(false);
    setMessage('');
    setTitle(translate(defaultTitleRoute));
    setOnCancel(() => {});
    setOnConfirm(() => {});
    setContent(undefined);
    setHideButtons(false);
    setModalWidth('400px');
    setHideCancel(false);
  }

  function handleConfirm() {
    onConfirm && onConfirm();
    hideHandler();
  }

  function handleCancel() {
    onCancel && onCancel();
    hideHandler();
  }

  if (!showModal) return null;

  return (
    <S.BackgroundView>
      <S.ModalView modalWidth={modalWidth}>
        {title !== '' && (
          <>
            <S.StyledTitle>{title}</S.StyledTitle>
            <S.Spacer />
          </>
        )}
        {message !== '' && <S.StyledMessage>{message}</S.StyledMessage>}
        {content && content()}
        {!hideButtons && (
          <S.StyledButtonRow>
            <DefaultButton type={ButtonType.confirm} onClick={handleConfirm} />
            {!hideCancel && <DefaultButton type={ButtonType.cancel} onClick={handleCancel} />}
          </S.StyledButtonRow>
        )}
      </S.ModalView>
    </S.BackgroundView>
  );
}

export function useConfirmModal() {
  return {
    Component: ConfirmModal,
    show: (props: ConfirmModalProps) => showHandler(props),
    hide: () => hideHandler(),
  };
}
