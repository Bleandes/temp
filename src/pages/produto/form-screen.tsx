import {FormField} from '#components/form-field';
import {FormRow} from '#components/form-field/styles';
import {FormFieldTypes} from '#components/form-field/types';
import {Screen} from '#components/screen';
import {useToast} from '#components/toast';
import {useForm} from '#hooks/use-form';
import {FormScreenProps} from '#types/global-types';
import {useNavigate} from 'react-router';
import {useProdutoModuleApi} from './api';
import {useEffect} from 'react';
import {useTranslate} from '#hooks/use-translate';
import {brazilianCurrencyFormatter} from '#helper/formatters';
import {useProdutoTableConfig} from './config';

export function ProdutoFormScreen(props: FormScreenProps) {
  const [form, setForm] = useForm({});
  const {translate} = useTranslate();
  const api = useProdutoModuleApi();
  const navigate = useNavigate();
  const config = useProdutoTableConfig();
  const toast = useToast();

  useEffect(() => {
    async function init() {
      if (props.id) {
        const response = await api.retornaProdutoPorId(props.id);
        form.setInitialValues({
          ...response,
          unidadeManipulacao: response.unidadeManipulacao.descricao,
          unidadeEstoque: response.unidadeEstoque.descricao,
          situacaoTributaria: config
            .optionsSituacaoTributaria()
            .filter((x) => x.index === parseInt(response.situacaoTributaria))[0],
        });
      }
    }
    init();
  }, []);

  async function submit() {
    switch (props.type) {
      case 'edit': {
        await api.editarProduto(form.values, () => {
          toast.showSuccessToast('global.success.edit');
          navigate(-1);
        });
        break;
      }
      case 'create': {
        await api.adicionarProduto(form.values, () => {
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
      <FormRow gapSize="1%" marginTop="10px">
        <FormField
          name={'global.description'}
          value={form.getValue('descricao')}
          fieldType={FormFieldTypes.textInput}
          width="40%"
          readonly={props.type === 'details'}
        />
        <FormField
          name={'global.group'}
          value={form.getValue('grupo')}
          fieldType={FormFieldTypes.dropDown}
          data={[]}
          width="19%"
          filterDataBy={'descricao'}
          readonly={props.type === 'details'}
        />
        <FormField
          name={'produto.unidadeManipulacao'}
          value={form.getValue('unidadeManipulacao')}
          fieldType={FormFieldTypes.textInput}
          width="19%"
          readonly={props.type === 'details'}
        />
        <FormField
          name={'produto.unidadeEstoque'}
          value={form.getValue('unidadeEstoque')}
          fieldType={FormFieldTypes.textInput}
          width="19%"
          readonly={props.type === 'details'}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'produto.valorCusto'}
          value={brazilianCurrencyFormatter.format(form.getValue<number>('valorCusto') ?? '')}
          fieldType={FormFieldTypes.textInput}
          width="20%"
          readonly={props.type === 'details'}
        />
        <FormField
          name={'produto.valorCustoMedio'}
          value={brazilianCurrencyFormatter.format(form.getValue<number>('valorCustoMedio') ?? '')}
          fieldType={FormFieldTypes.textInput}
          width="19%"
          readonly={props.type === 'details'}
        />
        <FormField
          name={'produto.valorVenda'}
          value={brazilianCurrencyFormatter.format(form.getValue<number>('valorVenda') ?? '')}
          fieldType={FormFieldTypes.textInput}
          width="19%"
          readonly={props.type === 'details'}
        />
        <FormField
          name={'produto.estoqueMinimo'}
          value={form.getValue('estoqueMinimo')}
          fieldType={FormFieldTypes.textInput}
          width="19%"
          readonly={props.type === 'details'}
        />
        <FormField
          name={'produto.estoqueMaximo'}
          value={form.getValue('estoqueMaximo')}
          fieldType={FormFieldTypes.textInput}
          width="19%"
          readonly={props.type === 'details'}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'global.supplier'}
          value={form.getValue('fornecedor')}
          fieldType={FormFieldTypes.dropDown}
          data={[]}
          width="40%"
          filterDataBy={'nomeFornecedor'}
          readonly={props.type === 'details'}
        />
        <FormField
          name={'produto.dataUltimaCompra'}
          value={form.getValue('dataUltimaCompra')}
          fieldType={FormFieldTypes.datePicker}
          width="19%"
          readonly={props.type === 'details'}
        />
        <FormField
          name={'produto.curvaAbc'}
          value={form.getValue('curvaAbc')}
          fieldType={FormFieldTypes.dropDown}
          data={config.optionsCurvaAbc()}
          width="19%"
          readonly={props.type === 'details'}
          filterDataBy={'value'}
        />
        <FormField
          name={'produto.aliquotaIcms'}
          value={form.getValue('aliquotaIcms')}
          fieldType={FormFieldTypes.textInput}
          width="19%"
          readonly={props.type === 'details'}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'produto.calculo'}
          value={form.getValue('calculo')}
          fieldType={FormFieldTypes.radioButtons}
          options={[
            translate('global.percentage'),
            translate('global.capsule'),
            translate('global.qsp'),
            translate('produto.semCalculo'),
          ]}
          returnIndexRadioButtons
          width="20%"
          readonly={props.type === 'details'}
        />
        <FormField
          name={'produto.situacaoTributaria'}
          value={form.getValue('situacaoTributaria')}
          fieldType={FormFieldTypes.dropDown}
          data={config.optionsSituacaoTributaria()}
          width="19%"
          readonly={props.type === 'details'}
          filterDataBy={'value'}
        />
        <FormField
          name={'produto.codigoDcb'}
          value={form.getValue('codigoDcb')}
          fieldType={FormFieldTypes.textInput}
          width="19%"
          readonly={props.type === 'details'}
        />
        <FormField
          name={'produto.codigoCas'}
          value={form.getValue('codigoCas')}
          fieldType={FormFieldTypes.textInput}
          width="19%"
          readonly={props.type === 'details'}
        />
        <FormField
          name={'produto.produtoInativo'}
          value={form.getValue('produtoInativo')}
          fieldType={FormFieldTypes.switch}
          width={'19%'}
          readonly={props.type === 'details'}
          border={false}
        />
      </FormRow>
    </Screen>
  );
}
