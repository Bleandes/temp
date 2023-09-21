import {useForm} from '#hooks/use-form';
import {useEffect, useState} from 'react';
import {initialValues, useEmailConfig, validations} from './config';
import {useTranslate} from '#hooks/use-translate';
import {IEmail} from './types';
import {useStateWithHistory} from '#hooks/use-state-with-history';
import {useGlobalContext} from '#hooks/use-global-context';
import {useEmailModuleApi} from './api';
import {useToast} from '#components/toast';
import {IConfiguracaoEmpresa} from '#pages/empresa/types';
import {Screen} from '#components/screen';
import {FormField} from '#components/form-field';
import {FormFieldTypes} from '#components/form-field/types';
import {Spacer} from '#components/spacer';
import {FormRow} from '#components/form-field/styles';
import {maxLengthNumber} from '#helper/max-length-numbers';
import {DefaultButton} from '#components/default-button';
import {ButtonType} from '#components/default-button/types';
import {cloneDeep} from 'lodash';

function Email() {
  const [form, onFormChange] = useForm({initialValues, validations});
  const {translate} = useTranslate();
  const [emails, setEmails] = useState<IEmail[]>([]);
  const [tipo, setTipo] = useStateWithHistory({});
  const context = useGlobalContext();
  const sessionInfo = context.getSessionInfo();
  const api = useEmailModuleApi();
  const toast = useToast();
  const config = useEmailConfig();

  async function init() {
    const response = await api.retornaEmailsPorEmpresaId();
    setEmails(response);
    const emailPadrao = response.filter((x: IEmail) => x.tipo == 0);
    if (emailPadrao && emailPadrao.length > 0) {
      form.setValues({
        email: emailPadrao[0].email,
        senha: emailPadrao[0].senha,
        server: emailPadrao[0].server,
        port: emailPadrao[0].port,
        ssl: emailPadrao[0].ssl,
        conexaoSegura: emailPadrao[0].conexaoSegura,
        tipo: tipo.tipo,
      });
    } else {
      form.clear();
    }
    setTipo({
      tipo: 0,
      descricao: translate('email.tipo.padrao'),
    });
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const emailFilter = emails.filter((x: IEmail) => x.tipo == tipo.tipo);

    if (emailFilter && emailFilter.length > 0) {
      form.setValues({
        email: emailFilter[0].email,
        senha: emailFilter[0].senha,
        server: emailFilter[0].server,
        port: emailFilter[0].port,
        ssl: emailFilter[0].ssl,
        conexaoSegura: emailFilter[0].conexaoSegura,
        tipo: emailFilter[0].tipo,
      });
    } else {
      form.clear();
    }
  }, [tipo]);

  async function submit() {
    let body = cloneDeep(form.values);
    body.tipo = tipo.tipo;

    await api.adicionarEmail(body, () => {
      toast.showSuccessToast('global.success.register');
      let newSessionInfo = {...sessionInfo};
      newSessionInfo.configuracaoEmpresa = {
        ...newSessionInfo.configuracaoEmpresa,
        emailConfigurado: false,
      } as IConfiguracaoEmpresa;
      context.setPersistContext('sessionInfo', newSessionInfo);
      init();
    });
  }

  async function testEmail() {
    let body = cloneDeep(form.values);
    body.tipo = tipo.tipo;

    await api.testEmail(body, () => {
      toast.showSuccessToast('email.enviado');
    });
  }

  return (
    <Screen title={translate('email.title')} formButtons hideCancelButton onSave={() => form.trySave(submit)}>
      <FormField
        name={translate('email.dropDown')}
        value={tipo}
        onChange={(value: any) => setTipo(value ?? {})}
        fieldType={FormFieldTypes.dropDown}
        data={config.tiposEmails()}
        width="30%"
        required
        maxSize={100}
        filterDataBy={'descricao'}
      />

      <Spacer marginTop={20} text={`${translate('global.email')} ${tipo.descricao}`} />

      <FormRow gapSize="1%" marginTop="10px">
        <FormField
          name={translate('global.email')}
          onChange={onFormChange('email')}
          value={form.getValue('email')}
          error={form.getError('email')}
          fieldType={FormFieldTypes.textInput}
          width="30%"
          required
          autoFocus
          maxSize={100}
        />
        <FormField
          name={translate('global.password')}
          onChange={onFormChange('senha')}
          value={form.getValue('senha')}
          error={form.getError('senha')}
          fieldType={FormFieldTypes.textInput}
          width="30%"
          required
          isPassword
          maxSize={50}
        />
      </FormRow>

      <FormRow gapSize="1%">
        <FormField
          name={translate('global.server')}
          onChange={onFormChange('server')}
          value={form.getValue('server')}
          error={form.getError('server')}
          fieldType={FormFieldTypes.textInput}
          width="30%"
          required
          maxSize={50}
        />
        <FormField
          name={translate('global.port')}
          onChange={(value) => onFormChange('port')(maxLengthNumber(0, 6, value))}
          value={form.getValue('port')}
          error={form.getError('port')}
          fieldType={FormFieldTypes.textInput}
          width="19%"
          required
          maxSize={10}
        />
      </FormRow>

      <FormRow gapSize="1%">
        <FormField
          name={translate('email.ssl')}
          value={form.getValue('ssl')}
          onChange={onFormChange('ssl')}
          error={form.getError('ssl')}
          fieldType={FormFieldTypes.switch}
          width={'10%'}
          border={false}
        />
        <FormField
          name={translate('email.conexaoSegura')}
          value={form.getValue('conexaoSegura')}
          onChange={onFormChange('conexaoSegura')}
          error={form.getError('conexaoSegura')}
          fieldType={FormFieldTypes.switch}
          width={'25%'}
          border={false}
        />
      </FormRow>

      <DefaultButton type={ButtonType.confirm} text={translate('email.testarEmail')} onClick={testEmail} />
    </Screen>
  );
}

export const routes = [
  {
    path: '/configuracoes-email',
    element: () => <Email />,
  },
];
