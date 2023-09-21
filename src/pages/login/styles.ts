import {HiLockClosed, HiUser} from 'react-icons/hi';
import styled from 'styled-components';
import {ReactComponent as Login} from '#assets/svg/login.svg';
import {ReactComponent as Logo} from '#assets/svg/logo.svg';
import {RowContainer} from '#components/styled-containers';
import {Text} from '#components/text';

export const ScreenBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-position-y: bottom;
`;

export const ScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 100px;
  padding: 0px 150px 0px 0px;
  background-color: transparent;
`;

export const EmptyLogo = styled.div`
  background: transparent;
  width: 500px;
  height: 500px;
`;

export const LoginLogo = styled(Login)`
  width: 500px;
  height: 500px;
`;

export const FFLogo = styled(Logo)`
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 400px;
`;

export const WhiteDropDownText = styled(Text)`
  color: ${(props) => props.theme.colors.white};
`;

export const RowContainerRight = styled(RowContainer)<{marginTop?: number}>`
  width: 100%;
  justify-content: flex-end;
  margin-top: ${(props) => props.marginTop ?? 0}px;
`;

export const RowContainerLeft = styled(RowContainer)`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const UserIcon = styled(HiUser)`
  color: ${(props) => props.theme.colors.primaryFFW};
  font-size: 20px;
  margin-right: 10px;
`;

export const PasswordIcon = styled(HiLockClosed)`
  color: ${(props) => props.theme.colors.primaryFFW};
  font-size: 20px;
  margin-right: 10px;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.colors.lightGreyAlfa};
  padding: 15px;
  ::placeholder {
    font-weight: 400;
    opacity: 0.7;
    color: ${(props) => props.theme.colors.grey};
    font-size: ${(props) => props.theme.fontSize.default};
  }
`;

export const CredentialsText = styled(Text)`
  color: ${(props) => props.theme.colors.black};
  width: 100%;
  margin-left: 60px;
`;

export const Line = styled.div`
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.gradients.login.from} -1.97%,
    ${(props) => props.theme.colors.gradients.login.to} 97.92%
  );
  border: none;
  height: 3px;
  width: 100%;
  margin: 5px 0px 15px 0px;
`;

export const LoginButton = styled.button`
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.gradients.login.from} -1.97%,
    ${(props) => props.theme.colors.gradients.login.to} 97.92%
  );
  border: none;
  border-radius: 50px;
  width: 90%;
  height: 35px;
  cursor: pointer;
`;

export const ForgotPasswordButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const ForgotPasswordText = styled(Text)`
  color: ${(props) => props.theme.colors.primaryFFW};
  font-size: ${(props) => props.theme.fontSize.small};
`;

export const TermsButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
`;

export const TermsText = styled(Text)`
  color: ${(props) => props.theme.colors.grey};
  font-size: ${(props) => props.theme.fontSize.small};
  text-align: right;
`;

export const ErrorText = styled(Text)`
  color: ${(props) => props.theme.colors.red};
  font-size: ${(props) => props.theme.fontSize.smaller};
  font-weight: 600;
  margin-top: 5px;
  background-color: transparent;
`;

export const ModalBody = styled.div`
  width: 100%;
  height: 100px;
`;
