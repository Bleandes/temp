import FormControlLabel from '@mui/material/FormControlLabel';
import {useTranslate} from '#hooks/use-translate';
import * as S from './styles';
import {SwitchProps} from './types';

export function Switch(props: SwitchProps) {
  const {translate} = useTranslate();

  return (
    <S.SwitchClickableView onClick={props.onMouseClick}>
      <FormControlLabel
        control={
          <S.StyledSwitch
            checked={props.value}
            disabled={props.readonly}
            switchColor={props.color || ''}
          />
        }
        label={<S.SwitchText>{translate(props.name ?? '')}</S.SwitchText>}
      />
    </S.SwitchClickableView>
  );
}
