import {useState} from 'react';
import LoginBackground from '#assets/png/login-background.png';
import {FormField} from '#components/form-field';
import {FormFieldTypes} from '#components/form-field/types';
import {LanguageSelector} from '#components/language-selector';
import {DefaultModal} from '#components/modal/default-modal';
import {useToast} from '#components/toast';
import {isEmail, isEmpty} from '#helper/form-validations';
import {useForm} from '#hooks/use-form';
import {useKeyDown} from '#hooks/use-key-down';
import {useTranslate} from '#hooks/use-translate';
import {useWindowDimensions} from '#hooks/use-window-dimensions';
import {useLoginModuleApi} from './api';
import * as S from './styles';

const validations = {
  email: [isEmpty()],
  password: [isEmpty()],
};

const validationsModal = {
  email: [isEmpty(), isEmail()],
};

export function Login() {
  const {translate} = useTranslate();
  const windowDimensions = useWindowDimensions();
  const api = useLoginModuleApi();
  const toast = useToast();
  const [form, setForm] = useForm({validations});
  const [modalForm, setModalForm] = useForm({
    validations: validationsModal,
  });
  const [show, setShow] = useState(false);

  async function handleSubmit() {
    await api.login(form.getValue<string>('email'), form.getValue<string>('password'));
  }

  async function forgotPassword() {
    setShow(false);
    return await api.resetSenha(modalForm.getValue<string>('email'), () => {
      toast.showSuccessToast('login.resetPassword.success');
    });
  }

  useKeyDown(() => {
    form.trySave(handleSubmit);
  }, ['Enter']);

  return (
    <S.ScreenBackground
      style={{
        backgroundImage: windowDimensions.width < 1090 ? '' : `url(${LoginBackground})`,
      }}
    >
      <S.ScreenContainer>
        {windowDimensions.width > 1200 ? <S.LoginLogo /> : <S.EmptyLogo />}

        <S.LoginContainer>
          <S.FFLogo />

          <S.RowContainerRight>
            <LanguageSelector />
          </S.RowContainerRight>

          <S.CredentialsText>{translate('global.user')}</S.CredentialsText>
          <S.RowContainerLeft>
            <S.UserIcon />
            <S.Input
              value={form.getValue('email')}
              onChange={(e) => setForm('email')(e.target.value)}
              placeholder={translate('login.placeHolder.email')}
            />
          </S.RowContainerLeft>
          <S.ErrorText>{translate(form.getError('email') ?? '')}</S.ErrorText>
          <S.Line />

          <S.CredentialsText>{translate('global.password')}</S.CredentialsText>
          <S.RowContainerLeft>
            <S.PasswordIcon />
            <S.Input
              value={form.getValue('password')}
              onChange={(e: any) => setForm('password')(e.target.value)}
              placeholder={translate('login.placeHolder.password')}
              type={'password'}
            />
          </S.RowContainerLeft>
          <S.ErrorText>{translate(form.getError('password') ?? '')}</S.ErrorText>
          <S.Line />

          <S.LoginButton onClick={() => form.trySave(handleSubmit)}>
            <S.WhiteDropDownText>{translate('buttons.login')}</S.WhiteDropDownText>
          </S.LoginButton>

          <S.RowContainerRight marginTop={15}>
            <S.ForgotPasswordButton onClick={() => setShow(true)}>
              <S.ForgotPasswordText>{translate('buttons.forgotPassword')}</S.ForgotPasswordText>
            </S.ForgotPasswordButton>
          </S.RowContainerRight>

          {/* <S.RowContainerRight marginTop={15}>
            <S.TermsButton>
              <S.TermsText>{translate('login.terms')}</S.TermsText>
            </S.TermsButton>
          </S.RowContainerRight> */}
        </S.LoginContainer>
      </S.ScreenContainer>

      <DefaultModal
        title="buttons.forgotPassword"
        show={show}
        onCancel={() => {
          setShow(false);
          modalForm.clear();
        }}
        onConfirm={() => modalForm.trySave(forgotPassword)}
      >
        <S.ModalBody>
          <FormField
            name={'global.email'}
            fieldType={FormFieldTypes.textInput}
            value={modalForm.getValue('email')}
            onChange={setModalForm('email')}
            error={modalForm.getError('email')}
            width={'100%'}
          />
        </S.ModalBody>
      </DefaultModal>
    </S.ScreenBackground>
  );
}
