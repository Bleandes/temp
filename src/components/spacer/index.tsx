import {useTranslate} from '#hooks/use-translate';
import * as S from './styles';
import {SpacerProps} from './types';

export function Spacer(props: SpacerProps) {
  const {translate} = useTranslate();

  return (
    <S.StyledSpacerRow {...props}>
      {props.centeredText ? (
        <>
          <S.Line />
          {props.text && <S.StyledText centered>{translate(props.text)}</S.StyledText>}
          <S.Line />
        </>
      ) : (
        <>
          {props.text && <S.StyledText>{translate(props.text)}</S.StyledText>}
          <S.Line />
        </>
      )}
    </S.StyledSpacerRow>
  );
}
