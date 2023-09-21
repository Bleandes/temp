import {useEffect} from 'react';
import {FormField} from '#components/form-field';
import {FormRow} from '#components/form-field/styles';
import {FormFieldTypes} from '#components/form-field/types';
import {Screen} from '#components/screen';
import {useToast} from '#components/toast';
import {isEmpty} from '#helper/form-validations';
import {useForm} from '#hooks/use-form';
import {useTranslate} from '#hooks/use-translate';
import {useBairroModuleApi} from './api';
import {useNavigate} from 'react-router-dom';
import {FormScreenProps} from '#types/global-types';

const validations = {
  nome: [isEmpty()],
};

export function BairroFormScreen(props: FormScreenProps) {
  const {translate} = useTranslate();
  const navigate = useNavigate();
  const api = useBairroModuleApi();
  const toast = useToast();
  const [form, onFormChange] = useForm({validations: validations});

  useEffect(() => {
    async function Init() {
      if (props.id) {
        const response = await api.retornaBairroPorId(props.id);
        form.setInitialValues(response);
      }
    }

    Init();
  }, []);

  async function submit() {
    switch (props.type) {
      case 'edit': {
        await api.editarBairro(form.values, () => {
          navigate('/bairro');
          toast.showSuccessToast('global.success.edit');
        });
        break;
      }
      case 'create': {
        await api.adicionarBairro(form.values, () => {
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
          name={translate('global.name')}
          value={form.getValue('nome')}
          onChange={onFormChange('nome')}
          error={form.getError('nome')}
          fieldType={FormFieldTypes.textInput}
          placeHolder={translate('bairro.placeholders.name')}
          required={props.type !== 'details'}
          readonly={props.type === 'details'}
          autoFocus={props.type === 'details'}
          maxSize={50}
        />
      </FormRow>
    </Screen>
  );
}
