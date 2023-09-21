import {cloneDeep} from 'lodash';
import {useEffect, useState} from 'react';
import {FormField} from '#components/form-field';
import {FormRow} from '#components/form-field/styles';
import {FormFieldTypes} from '#components/form-field/types';
import {Screen} from '#components/screen';
import {useToast} from '#components/toast';
import {isEmpty} from '#helper/form-validations';
import {onlyNumbers} from '#helper/regex';
import {useForm} from '#hooks/use-form';
import {useTranslate} from '#hooks/use-translate';
import {ITributo} from '#pages/tributo/types';
import {useCidadeModuleApi} from './api';
import {ICidade} from './types';
import {FormScreenProps} from '#types/global-types';
import {useNavigate} from 'react-router-dom';

const validations = {
  nome: [isEmpty()],
};

export function CidadeFormScreen(props: FormScreenProps) {
  const {translate} = useTranslate();
  const navigate = useNavigate();
  const toast = useToast();
  const api = useCidadeModuleApi();
  const [form, onFormChange] = useForm({validations});
  const [tributos, setTributos] = useState([] as ITributo[]);

  useEffect(() => {
    async function init() {
      let cidadeResponse: ICidade | undefined;
      let codigoCfpsId;
      if (props.id) {
        cidadeResponse = await api.retornaCidadePorId(props.id);
      }
      if (props.type !== 'details') {
        const tributosResponse = await api.listaTributo();
        codigoCfpsId = tributosResponse.filter((x) => x.id === cidadeResponse?.tributoId)[0];
        setTributos(tributosResponse.filter((x: ITributo) => x.tipoTributo == 6));
      }

      form.setInitialValues({
        ...cidadeResponse,
        ...codigoCfpsId,
      });
    }

    init();
  }, []);

  async function submit() {
    const rawData = cloneDeep(form.values);
    if (rawData.tributo) {
      rawData.tributoId = rawData.tributo.id;
      delete rawData.tributo;
      delete rawData.codigoCfpsId;
    }

    switch (props.type) {
      case 'edit': {
        await api.editarCidade(rawData, () => {
          navigate('/cidade');
          toast.showSuccessToast('global.success.edit');
        });
        break;
      }
      case 'create': {
        await api.adicionarCidade(rawData, () => {
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
          required={props.type !== 'details'}
          readonly={props.type === 'details'}
          maxSize={50}
          width="31%"
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={translate('cidade.ibgeCode')}
          value={form.getValue('codigoIbge')}
          onChange={onFormChange('codigoIbge')}
          error={form.getError('codigoIbge')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          mask={onlyNumbers}
          width="15%"
          maxSize={10}
        />
        <FormField
          name={translate('cidade.siafiCode')}
          value={form.getValue('codigoSiafi')}
          onChange={onFormChange('codigoSiafi')}
          error={form.getError('codigoSiafi')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          mask={onlyNumbers}
          width="15%"
          maxSize={22}
        />
      </FormRow>
      <FormField
        name={translate('cidade.cfpsCode')}
        value={form.getValue('tributo')}
        onChange={onFormChange('tributo')}
        error={form.getError('tributo')}
        fieldType={FormFieldTypes.dropDown}
        readonly={props.type === 'details'}
        width="31%"
        data={tributos}
        filterDataBy={'descricao'}
      />
    </Screen>
  );
}
