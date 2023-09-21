import {useEffect} from 'react';
import {FormField} from '#components/form-field';
import {FormRow} from '#components/form-field/styles';
import {FormFieldTypes} from '#components/form-field/types';
import {Screen} from '#components/screen';
import {useToast} from '#components/toast';
import {isEmpty} from '#helper/form-validations';
import {useForm} from '#hooks/use-form';
import {useNavigate} from 'react-router-dom';
import {FormScreenProps} from '#types/global-types';
import {usePaisModuleApi} from './api';
import {onlyNumbers} from '#helper/regex';

const validations = {
  nome: [isEmpty()],
  codigoIbge: [isEmpty()],
};

export function PaisFormScreen(props: FormScreenProps) {
  const navigate = useNavigate();
  const api = usePaisModuleApi();
  const toast = useToast();
  const [form, onFormChange] = useForm({validations: validations});

  useEffect(() => {
    async function init() {
      if (props.id) {
        const response = await api.retornaPaisPorId(props.id);
        form.setInitialValues(response);
      }
    }

    init();
  }, []);

  async function submit() {
    switch (props.type) {
      case 'edit': {
        await api.editarPais(form.values, () => {
          navigate('/pais');
          toast.showSuccessToast('global.success.edit');
        });
        break;
      }
      case 'create': {
        await api.adicionarPais(form.values, () => {
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
          value={form.getValue('nome')}
          onChange={onFormChange('nome')}
          error={form.getError('nome')}
          fieldType={FormFieldTypes.textInput}
          required={props.type !== 'details'}
          readonly={props.type === 'details'}
          autoFocus={props.type === 'details'}
          maxSize={50}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'pais.ibgeCode'}
          value={form.getValue('codigoIbge')}
          onChange={onFormChange('codigoIbge')}
          error={form.getError('codigoIbge')}
          fieldType={FormFieldTypes.textInput}
          mask={onlyNumbers}
          required={props.type !== 'details'}
          readonly={props.type === 'details'}
          width="15%"
          maxSize={10}
        />
        <FormField
          name={'pais.telephoneCode'}
          value={form.getValue('codigoTelefonico')}
          onChange={onFormChange('codigoTelefonico')}
          error={form.getError('codigoTelefonico')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          mask={onlyNumbers}
          width="15%"
          maxSize={3}
        />
      </FormRow>
    </Screen>
  );
}
