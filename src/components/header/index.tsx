import {useTranslate} from '#hooks/use-translate';
import {useNavigate} from 'react-router-dom';
import {DefaultButton} from '../default-button';
import {ButtonType} from '../default-button/types';
import * as S from './styles';
import {HeaderProps} from './types';

export function Header(props: HeaderProps) {
  const navigate = useNavigate();
  const {translate} = useTranslate();

  function editButton() {
    if (!props.editButton) return null;
    return (
      <S.EditButton onClick={() => props.onEdit && props.onEdit()}>
        <S.EditIcon />
        <S.Text>{translate('global.edit')}</S.Text>
      </S.EditButton>
    );
  }

  return (
    <S.ContainerHeaderMain>
      <S.TitleMainHeader>{props.title}</S.TitleMainHeader>
      {props.renderAfterTitle && props.renderAfterTitle()}
      {editButton()}
      {props.includeButton && <DefaultButton type={ButtonType.include} onClick={() => navigate('create')} />}
    </S.ContainerHeaderMain>
  );
}
