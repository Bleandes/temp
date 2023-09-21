import {useEffect, useState} from 'react';
import {TabGeral} from './components/tab-geral';
import {TabLayout} from './components/tab-layout';
import {cleanFormatMoney} from '#helper/formatters';
import {IEmpresa} from './types';
import {useTabSystem} from '#components/tabs';
import {useTranslate} from '#hooks/use-translate';
import {useForm} from '#hooks/use-form';
import {useToast} from '#components/toast';
import {useThemeProvider} from '#theme/theme';
import {useEmpresaModuleApi} from './api';
import {isCpfValid, isNumberAboveZero} from '#helper/form-validations';
import {useGlobalContext} from '#hooks/use-global-context';
import {Screen} from '#components/screen';
import {ConditionalWrapper} from '#components/conditional-wrapper';
import { useHasPermissao } from '#hooks/use-has-permissao';

const validations = {
  cpfRespSNGPC: [isCpfValid(undefined, true)],
  crf: [isNumberAboveZero(undefined, true)],
};

function Empresa() {
  const context = useGlobalContext();
  const api = useEmpresaModuleApi();
  const themeProvider = useThemeProvider();
  const toast = useToast();
  const {hasPermissaoById} = useHasPermissao();
  const [form, setForm] = useForm({validations});
  const [empresa, setEmpresa] = useState<IEmpresa>({} as IEmpresa);
  const [edit, setEdit] = useState(false);
  const {translate} = useTranslate();
  const Tabs = useTabSystem();

  useEffect(() => {
    async function init() {
      let empresa = await api.retornaEmpresaPorId();
      form.setInitialValues(empresa);
      setEmpresa(empresa);
    }
    init();
  }, []);

  function handleFormChange(key: string, value: any) {
    setForm(key)(value);
  }

  function handleGetFormValue(key: string) {
    return form.getValue(key);
  }

  function handleGetFormErrors(key: string) {
    return form.getError(key);
  }

  function handleSetFormValue(values: any) {
    return form.setValues(values);
  }

  function handleCancel() {
    setEdit(false);
    form.setInitialValues(empresa);
  }

  async function submitEdit() {
    if (form.touched.length === 0) return;
    let body = {...form.values};
    body.configuracaoEmpresa.markupPadrao = cleanFormatMoney(body.configuracaoEmpresa.markupPadrao);
    body.configuracaoEmpresa.prazoPadrao = parseInt(body.configuracaoEmpresa.prazoPadrao);
    if (body.cidade) {
      body.cidadeId = body.cidade.id;
      delete body.cidade;
    }
    if (body.estado) {
      body.estadoId = body.estado.id;
      delete body.estado;
    }
    if (body.bairro) {
      body.bairroId = body.bairro.id;
      delete body.bairro;
    }
    return await api.editarEmpresa(body as IEmpresa, () => {
      toast.showSuccessToast('global.success.edit');
      if (form.touched.includes('configuracaoEmpresa')) updateThemes();
    });
  }

  function updateThemes() {
    const newSessionInfo = {
      ...context.getSessionInfo(),
    };
    const configuracaoEmpresa = form.getValue('configuracaoEmpresa');
    newSessionInfo.configuracaoEmpresa = {
      id: newSessionInfo.configuracaoEmpresa?.id || '',
      banner: configuracaoEmpresa.banner,
      logo: configuracaoEmpresa.logo,
      cor: configuracaoEmpresa.cor,
      markupPadrao: configuracaoEmpresa.markupPadrao,
      prazoPadrao: configuracaoEmpresa.prazoPadrao,
    };
    context.setPersistContext('sessionInfo', newSessionInfo);
    themeProvider.updatePrimaryColor(configuracaoEmpresa.cor);
  }

  return (
    <Screen
      title={translate('global.company')}
      formButtons={edit}
      onCancel={handleCancel}
      onSave={() => form.trySave(submitEdit)}
      editButton={hasPermissaoById('/empresa/edit')}
      onEdit={() => setEdit(!edit)}
    >
      <Tabs.TabManager tabConfig={['empresa.tabs.geral.title', 'empresa.tabs.layout.title']} />
      <ConditionalWrapper show={Tabs.currentTab === 0}>
        <TabGeral
          empresaForm={form.values as IEmpresa}
          empresaServer={empresa}
          edit={edit}
          handleGetFormErrors={handleGetFormErrors}
          handleGetFormValue={handleGetFormValue}
          handleFormChange={handleFormChange}
          handleSetFormValue={handleSetFormValue}
          toucheds={form.touched}
        />
      </ConditionalWrapper>
      <ConditionalWrapper show={Tabs.currentTab === 1}>
        <TabLayout
          empresaForm={form.values as IEmpresa}
          empresaServer={empresa}
          edit={edit}
          handleGetFormErrors={handleGetFormErrors}
          handleGetFormValue={handleGetFormValue}
          handleFormChange={handleFormChange}
          handleSetFormValue={handleSetFormValue}
          toucheds={form.touched}
        />
      </ConditionalWrapper>
    </Screen>
  );
}

export const routes = [
  {
    path: '/empresa',
    element: () => <Empresa />,
  },
];
