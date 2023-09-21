import {FormField} from '#components/form-field';
import {FormRow} from '#components/form-field/styles';
import {FormFieldTypes} from '#components/form-field/types';
import {Screen} from '#components/screen';
import {Spacer} from '#components/spacer';
import {useToast} from '#components/toast';
import {isCnpjValid, isEmpty} from '#helper/form-validations';
import {onlyNumbers} from '#helper/regex';
import {useForm} from '#hooks/use-form';
import {useTranslate} from '#hooks/use-translate';
import {deMaskCnpj, maskCnpj} from '#mask/mask';
import {FormScreenProps} from '#types/global-types';
import {useNavigate} from 'react-router-dom';
import {useBancoModuleApi} from './api';
import {useEffect} from 'react';

const validations = {
  nome: [isEmpty()],
  cnpjCedente: [isCnpjValid(undefined, true)],
};

export function BancoFormScreen(props: FormScreenProps) {
  const [form, setForm] = useForm({validations});
  const api = useBancoModuleApi();
  const toast = useToast();
  const {translate} = useTranslate();
  const navigate = useNavigate();

  async function submit() {
    switch (props.type) {
      case 'create': {
        await api.adicionarBanco(form.values, () => {
          toast.showSuccessToast('global.success.register');
          form.clear();
        });
        break;
      }
      case 'edit': {
        await api.editarBanco(form.values, () => {
          navigate(-1);
          toast.showSuccessToast('global.success.edit');
        });
        break;
      }
    }
  }

  useEffect(() => {
    async function init() {
      const response = await api.retornaBancoPorId(props.id ?? '');
      form.setValues(response);
    }
    if (props.type !== 'create') {
      init();
    }
  }, []);

  return (
    <Screen
      title={props.title ?? ''}
      formButtons={props.type !== 'details'}
      onSave={() => form.trySave(submit)}
      backButton
    >
      <FormRow gapSize="1%" marginTop={'10px'}>
        <FormField
          name={translate('global.name')}
          value={form.getValue('nome')}
          onChange={setForm('nome')}
          error={form.getError('nome')}
          fieldType={FormFieldTypes.textInput}
          width="30%"
          required={props.type !== 'details'}
          readonly={props.type === 'details'}
          maxSize={50}
        />
        <FormField
          name={translate('banco.codigoBanco')}
          value={form.getValue('codigoBanco')}
          onChange={setForm('codigoBanco')}
          error={form.getError('codigoBanco')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="19%"
          maxSize={3}
          mask={onlyNumbers}
        />
        <FormField
          name={translate('banco.carteira')}
          value={form.getValue('carteira')}
          onChange={setForm('carteira')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="19%"
          maxSize={10}
        />
        <FormField
          name={translate('banco.modalidade')}
          value={form.getValue('modalidade')}
          onChange={setForm('modalidade')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="19%"
          maxSize={5}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={translate('banco.formaCobranca')}
          value={!form.getValue('formaCobranca') ? undefined : form.getValue('formaCobranca') === 'B' ? 0 : 1}
          onChange={(index: number) => setForm('formaCobranca')(index === 0 ? 'B' : 'D')}
          fieldType={FormFieldTypes.radioButtons}
          options={[
            translate('banco.radioButtonOptions.formaCobranca.boleto'),
            translate('banco.radioButtonOptions.formaCobranca.desconto'),
          ]}
          readonly={props.type === 'details'}
          returnIndexRadioButtons
          width="30%"
        />
        <FormField
          name={translate('banco.layout')}
          value={!form.getValue('layout') ? undefined : form.getValue('layout') === '240' ? 0 : 1}
          onChange={(index: number) => setForm('layout')(index === 0 ? '240' : '400')}
          fieldType={FormFieldTypes.radioButtons}
          options={['240', '400']}
          returnIndexRadioButtons
          readonly={props.type === 'details'}
          width="15%"
        />
        <FormField
          name={translate('banco.sequenciaRemessa')}
          value={form.getValue('sequenciaRemessa')}
          onChange={setForm('sequenciaRemessa')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="15%"
          maxSize={5}
          mask={onlyNumbers}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={translate('banco.nomeCedente')}
          value={form.getValue('nomeCedente')}
          onChange={setForm('nomeCedente')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="20%"
          maxSize={70}
        />
        <FormField
          name={translate('banco.cnpjCedente')}
          value={maskCnpj(form.getValue('cnpjCedente'))}
          onChange={(value: any) => setForm('cnpjCedente')(deMaskCnpj(value))}
          error={form.getError('cnpjCedente')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="19%"
          maxSize={18}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={translate('banco.codigoCedente')}
          value={form.getValue('codigoCedente')}
          onChange={setForm('codigoCedente')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="20%"
          maxSize={20}
        />
        <FormField
          name={translate('banco.codigoTransmissao')}
          value={form.getValue('codigoTransmissao')}
          onChange={setForm('codigoTransmissao')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="19%"
          maxSize={20}
        />
        <FormField
          name={translate('banco.complementoTransmissao')}
          value={form.getValue('complementoTransmissao')}
          onChange={setForm('complementoTransmissao')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="25%"
          maxSize={10}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={translate('banco.agencia')}
          value={form.getValue('agencia')}
          onChange={setForm('agencia')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="7%"
          maxSize={4}
          mask={onlyNumbers}
        />
        <FormField
          name={translate('banco.agenciaDigito')}
          value={form.getValue('agenciaDigito')}
          onChange={setForm('agenciaDigito')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="15%"
          maxSize={1}
          mask={onlyNumbers}
        />
        <FormField
          name={translate('banco.diasProtesto')}
          value={form.getValue('diasProtesto')}
          onChange={setForm('diasProtesto')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="19%"
          maxSize={10}
          mask={onlyNumbers}
        />
        <FormField
          name={translate('banco.juros')}
          value={form.getValue('juros')}
          onChange={(value: any) => setForm('juros')(parseFloat(value) < 0 ? 0 : value)}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="7%"
          maxSize={5}
        />
        <FormField
          name={translate('banco.multa')}
          value={form.getValue('multa')}
          onChange={(value: any) => setForm('multa')(parseFloat(value) < 0 ? 0 : value)}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="7%"
          maxSize={5}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={translate('banco.contaCorrente')}
          value={form.getValue('contaCorrente')}
          onChange={setForm('contaCorrente')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="20%"
          maxSize={20}
          mask={onlyNumbers}
        />
        <FormField
          name={translate('banco.contaCorrenteDigito')}
          value={form.getValue('contaCorrenteDigito')}
          onChange={setForm('contaCorrenteDigito')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="19%"
          maxSize={1}
          mask={onlyNumbers}
        />
        <FormField
          name={translate('banco.convenio')}
          value={form.getValue('convenio')}
          onChange={setForm('convenio')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="19%"
          maxSize={10}
        />
        <FormField
          name={translate('banco.producao')}
          value={form.getValue('producao')}
          onChange={setForm('producao')}
          fieldType={FormFieldTypes.checkbox}
          readonly={props.type === 'details'}
          required={props.type !== 'details'}
          error={form.getError('nome')}
          width="19%"
        />
      </FormRow>
      <FormRow>
        <FormField
          name={translate('banco.localPagamento')}
          value={form.getValue('localPagamento')}
          onChange={setForm('localPagamento')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="100%"
          maxSize={70}
        />
      </FormRow>

      <Spacer text={translate('banco.fieldSetLegend.mensagensDeInstrucao')} marginTop={10} marginBottom={5} />

      <FormRow>
        <FormField
          name={translate('banco.mensagemInstrucao', {value: 1})}
          value={form.getValue('mensagemInstrucao1')}
          onChange={setForm('mensagemInstrucao1')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="100%"
          maxSize={70}
        />
      </FormRow>
      <FormRow>
        <FormField
          name={translate('banco.mensagemInstrucao', {value: 2})}
          value={form.getValue('mensagemInstrucao2')}
          onChange={setForm('mensagemInstrucao2')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="100%"
          maxSize={70}
        />
      </FormRow>
      <FormRow>
        <FormField
          name={translate('banco.mensagemInstrucao', {value: 3})}
          value={form.getValue('mensagemInstrucao3')}
          onChange={setForm('mensagemInstrucao3')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="100%"
          maxSize={70}
        />
      </FormRow>
      <FormRow>
        <FormField
          name={translate('banco.mensagemInstrucao', {value: 4})}
          value={form.getValue('mensagemInstrucao4')}
          onChange={setForm('mensagemInstrucao4')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="100%"
          maxSize={70}
        />
      </FormRow>
      <FormRow>
        <FormField
          name={translate('banco.mensagemInstrucao', {value: 5})}
          value={form.getValue('mensagemInstrucao5')}
          onChange={setForm('mensagemInstrucao5')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="100%"
          maxSize={70}
        />
      </FormRow>
    </Screen>
  );
}
