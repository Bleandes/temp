import styled from 'styled-components';
import {ImagePicker} from '../image-picker';
import {RowContainer} from '../styled-containers';
import * as S from './styles';
import {AvatarPickerProps} from './types';

const imageType = 'data:image/png;base64,';
export function AvatarPicker(props: AvatarPickerProps) {
  return (
    <S.AvatarWrapper disabled={props.disabled}>
      <ImagePicker
        maxWidth={500}
        maxHeight={500}
        onChange={props.disabled ? undefined : props.onChange}
        disabled={props.disabled}
      />
      {!props.value || props.value === '' ? (
        <S.AvatarIcon />
      ) : (
        <S.Avatar src={props.value.includes(imageType) ? props.value : imageType + props.value} />
      )}
      {!props.hideCamera && (
        <S.CameraIconWrapper>
          <S.CameraIcon />
        </S.CameraIconWrapper>
      )}
    </S.AvatarWrapper>
  );
}

export const AvatarRow = styled(RowContainer)`
  justify-content: center;
  width: 100%;
`;
