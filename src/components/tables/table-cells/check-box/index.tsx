import {useTranslate} from '#hooks/use-translate';
import * as S from './styles';
import {TableCellCheckBoxProps} from './types';

export function TableCellCheckBox(props: TableCellCheckBoxProps) {
  const {translate} = useTranslate();

  return (
    <S.CheckBoxClickableView onClick={props.onChange}>
      <S.CheckBox type="checkbox" checked={props.value} disabled={props.readonly} />
      {props.name && <S.CheckBoxText>{translate(props.name)}</S.CheckBoxText>}
    </S.CheckBoxClickableView>
  );
}
