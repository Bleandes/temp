import {AiOutlineCamera} from 'react-icons/ai';
import {BiUser} from 'react-icons/bi';
import styled from 'styled-components';
import {RowContainer} from '../styled-containers';

export const AvatarRow = styled(RowContainer)`
  justify-content: center;
`;

export const AvatarWrapper = styled(styled.label``)<{disabled?: boolean}>`
  width: 200px;
  height: 200px;
  border: 5px solid ${(props) => props.theme.colors.primary};
  border-radius: 100%;
  margin-top: 15px;
  position: relative;
  ${(props) => (props.disabled ? '' : 'cursor: pointer;')}
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarIcon = styled(BiUser)`
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  font-size: 80px;
`;

export const Avatar = styled.img`
  width: 195px;
  height: 195px;
  border-radius: 100%;
`;

export const CameraIconWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  left: 120px;
  top: 150px;
`;

export const CameraIcon = styled(AiOutlineCamera)`
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  font-size: 30px;
`;
