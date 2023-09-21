import {PropsWithChildren, useState} from 'react';
import {useTranslate} from '#hooks/use-translate';
import {ButtonType} from '../default-button/types';
import {Header} from '../header';
import * as S from './styles';
import {ScreenProps} from './types';
import {useNavigate} from 'react-router-dom';

export function Screen(props: PropsWithChildren<ScreenProps>) {
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const [hasTopBar, setHasTopBar] = useState(true);

  function onCancel() {
    if (props.onCancel) {
      return props.onCancel();
    }
    navigate(-1);
  }

  function onSave() {
    if (props.onSave) {
      return props.onSave();
    }
  }

  function renderAfterTitle() {
    return (
      <S.HeaderContainer>
        {props.renderAfterTitle && props.renderAfterTitle()}
        {props.backButton && (
          <S.StyledDefaultButton type={ButtonType.back} onClick={() => navigate(-1)} marginLeft={false} />
        )}
      </S.HeaderContainer>
    );
  }

  return (
    <S.Wrapper hasTopBar={hasTopBar}>
      {!props.hideNavbar && (
        <Header
          title={translate(props.title)}
          includeButton={props.includeButton}
          renderAfterTitle={renderAfterTitle}
          editButton={props.editButton}
          onEdit={props.onEdit}
        />
      )}
      <S.ScreenContainer style={{flex: 1}}>{props.children}</S.ScreenContainer>

      {!props.hideFooter && (
        <S.Footer footerMargin={props.footerMargin}>
          {props.formButtons && (
            <S.FormButtonsContainer>
              {!props.hideCancelButton && (
                <S.StyledDefaultButton type={ButtonType.cancel} onClick={onCancel} marginLeft={false} />
              )}
              <S.StyledDefaultButton type={ButtonType.save} onClick={onSave} marginLeft />
            </S.FormButtonsContainer>
          )}
        </S.Footer>
      )}
    </S.Wrapper>
  );
}
