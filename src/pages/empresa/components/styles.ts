import {BsCloudArrowUp} from 'react-icons/bs';
import styled from 'styled-components';
import {RowContainer} from '#components/styled-containers';
import {Text} from '#components/text';

export const Row = styled(RowContainer)`
  margin: 20px 0px 20px 0px;
`;

export const BannerPicker = styled(styled.label``)<{disabled?: boolean}>`
  ${(props) => (!!props.disabled ? '' : 'cursor: pointer;')}
  border: 1px solid ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 7px;
  width: 270px;
  height: 60px;
`;

export const BannerImage = styled.img`
  width: 270px;
  height: 60px;
  padding: 10px;
`;

export const BannerUploadText = styled(Text)`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSize.default};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
`;

export const RightBackground = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.primary};
  width: 21%;
  height: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const IconWrapper = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 11px;
  left: -12px;
`;

export const Icon = styled(BsCloudArrowUp)`
  color: ${(props) => props.theme.colors.white};
  width: 45px;
  height: 35px;
`;

export const LogoPicker = styled(styled.label``)<{disabled?: boolean}>`
  border: 1px solid ${(props) => props.theme.colors.primary};
  ${(props) => (!!props.disabled ? '' : 'cursor: pointer;')}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 7px;
  width: 60px;
  height: 60px;
  margin-left: 20px;
`;

export const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  padding: 10px;
`;

export const LogoUploadText = styled(Text)`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSize.tiny};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60%;
`;

export const TopBackground = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 41%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const LogoIconWrapper = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 50px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 14px;
  top: -6px;
`;

export const LogoIcon = styled(BsCloudArrowUp)`
  color: ${(props) => props.theme.colors.white};
  width: 35px;
  height: 25px;
`;
