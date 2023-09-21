import {ConditionalWrapper} from '#components/conditional-wrapper';
import {Screen} from '#components/screen';
import {useTabSystem} from '#components/tabs';
import {useToast} from '#components/toast';
import {useForm} from '#hooks/use-form';
import {useStateWithHistory} from '#hooks/use-state-with-history';
import {FormScreenProps} from '#types/global-types';
import {useEffect} from 'react';
import {useNavigate} from 'react-router';
import {useGrupoModuleApi} from './api';
import {TabGeral} from './components/tab-geral';
import {TabEnsaio} from './components/tab-ensaio';
import {IGrupo} from './types';

export function GrupoFormScreen(props: FormScreenProps) {
  const [form, setForm] = useForm({});
  const navigate = useNavigate();
  const toast = useToast();
  const Tabs = useTabSystem();
  const api = useGrupoModuleApi();
  const [formInfos, setFormInfos] = useStateWithHistory({} as IGrupo);

  useEffect(() => {
    async function init() {
      async function fetchFormInfos() {}
      async function setInitialForm() {
        const grupo = await api.retornaGrupoPorId(props.id ?? '');
        setFormInfos(grupo);
        form.setInitialValues(grupo);
      }

      switch (props.type) {
        case 'create': {
          await fetchFormInfos();
          break;
        }
        case 'edit': {
          await fetchFormInfos();
          await setInitialForm();
          break;
        }
        case 'details': {
          await setInitialForm();
          break;
        }
      }
    }
    init();
  }, []);

  async function submit() {
    switch (props.type) {
      case 'create': {
        await api.adicionarGrupo(form.values, () => {
          toast.showSuccessToast('global.success.register');
          form.clear();
        });
        break;
      }
      case 'edit': {
        await api.editarGrupo(form.values, () => {
          navigate('/fornecedor');
          toast.showSuccessToast('global.success.edit');
        });
        break;
      }
    }
  }

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

  return (
    <Screen
      title={props.title ?? ''}
      formButtons={props.type !== 'details'}
      onSave={() => form.trySave(submit)}
      backButton
    >
      <Tabs.TabManager tabConfig={['global.general', 'global.rehearsal']} />
      <ConditionalWrapper show={Tabs.currentTab === 0}>
        <TabGeral
          formInfos={formInfos}
          handleGetFormErrors={handleGetFormErrors}
          handleGetFormValue={handleGetFormValue}
          handleFormChange={handleFormChange}
          handleSetFormValue={handleSetFormValue}
          formType={props.type}
        />
      </ConditionalWrapper>
      <ConditionalWrapper show={Tabs.currentTab === 1}>
        <TabEnsaio
          formInfos={formInfos}
          handleGetFormErrors={handleGetFormErrors}
          handleGetFormValue={handleGetFormValue}
          handleFormChange={handleFormChange}
          handleSetFormValue={handleSetFormValue}
          formType={props.type}
        />
      </ConditionalWrapper>
    </Screen>
  );
}
