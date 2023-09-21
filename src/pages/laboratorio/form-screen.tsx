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
import {useLaboratorioModuleApi} from './api';

const validations = {
  descricao: [isEmpty()],
};

export function LaboratorioFormScreen(props: FormScreenProps) {
  const navigate = useNavigate();
  const api = useLaboratorioModuleApi();
  const toast = useToast();
  const [form, onFormChange] = useForm({validations: validations});

  useEffect(() => {
    async function init() {
      if (props.id) {
        const response = await api.retornaLaboratorioPorId(props.id);
        form.setInitialValues(response);
      }
    }

    init();
  }, []);

  async function submit() {
    switch (props.type) {
      case 'edit': {
        await api.editarLaboratorio(form.values, () => {
          navigate('/laboratorio');
          toast.showSuccessToast('global.success.edit');
        });
        break;
      }
      case 'create': {
        await api.adicionarLaboratorio(form.values, () => {
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
          name={'global.description'}
          value={form.getValue('descricao')}
          onChange={onFormChange('descricao')}
          error={form.getError('descricao')}
          fieldType={FormFieldTypes.textInput}
          required={props.type !== 'details'}
          readonly={props.type === 'details'}
          autoFocus={props.type === 'details'}
          maxSize={50}
        />
      </FormRow>
    </Screen>
  );
}
