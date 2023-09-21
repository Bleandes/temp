//@ts-nocheck
import {FormField} from '#components/form-field';
import {FormRow} from '#components/form-field/styles';
import {FormFieldTypes} from '#components/form-field/types';
import {Screen} from '#components/screen';
import {useToast} from '#components/toast';
import {isEmpty} from '#helper/form-validations';
import {useForm} from '#hooks/use-form';
import {FormScreenProps} from '#types/global-types';
import {useNavigate} from 'react-router';
import {usePortadorModuleApi} from './api';
import {useEffect} from 'react';

const validations = {
  nomePortador: [isEmpty()],
};

const initialValues = {
  portadorInativo: false,
};

export function PortadorFormScreen(props: FormScreenProps) {
  const [form, setForm] = useForm({validations, initialValues});
  const api = usePortadorModuleApi();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    async function init() {
      if (props.id) {
        const response = await api.retornaPortadorPorId(props.id);
        form.setInitialValues(response);
      }
    }
    init();
  }, []);

  async function submit() {
    switch (props.type) {
      case 'edit': {
        await api.editarPortador(form.values, () => {
          toast.showSuccessToast('global.success.edit');
          navigate(-1);
        });
        break;
      }
      case 'create': {
        await api.adicionarPortador(form.values, () => {
          toast.showSuccessToast('global.success.register');
          form.clear();
        });
        break;
      }
    }
  }

  return (
    <Screen
      title={props.title ?? ''}
      formButtons={props.type !== 'details'}
      onSave={() => form.trySave(submit)}
      backButton
    >
      <FormRow marginTop="10px">
        <FormField
          name={'global.name'}
          value={form.getValue('nomePortador')}
          error={form.getError('nomePortador')}
          onChange={setForm('nomePortador')}
          fieldType={FormFieldTypes.textInput}
          required={props.type !== 'details'}
          readonly={props.type === 'details'}
          maxSize={50}
        />
      </FormRow>
      <FormRow>
        <FormField
          name={'portador.portadorInativo'}
          value={form.getValue('portadorInativo')}
          onChange={setForm('portadorInativo')}
          fieldType={FormFieldTypes.checkbox}
          readonly={props.type === 'details'}
        />
      </FormRow>
    </Screen>
  );
}
