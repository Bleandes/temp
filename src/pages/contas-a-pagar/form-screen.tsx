import {useEffect, useState} from 'react';
import {useContasAPagarTableConfig} from './config';
import {isEmpty} from '#helper/form-validations';
import {useTranslate} from '#hooks/use-translate';
import {useToast} from '#components/toast';
import {useContasAPagarModuleApi} from './api';
import {useForm} from '#hooks/use-form';
import {useStateWithHistory} from '#hooks/use-state-with-history';
import {EditContaRequest, IContasAPagar, IDuplicatasContasAPagar} from './types';
import {generateDueDate} from '#helper/gerar-vencimento';
import {convertNumberToString, formatMoney, numberFormatterTwoDecimal} from '#helper/formatters';
import {Screen} from '#components/screen';
import {FormRow} from '#components/form-field/styles';
import {FormField} from '#components/form-field';
import {FormFieldTypes} from '#components/form-field/types';
import {onlyNumbers} from '#helper/regex';
import {DefaultButton} from '#components/default-button';
import {ButtonType} from '#components/default-button/types';
import {Spacer} from '#components/spacer';
import {DefaultTable} from '#components/tables/default-table';
import {FormScreenProps} from '#types/global-types';
import {cloneDeep} from 'lodash';
import {useGlobalContext} from '#hooks/use-global-context';
import {useNavigate} from 'react-router';

const validationsCreate = {
  fornecedor: [isEmpty()],
  numeroFatura: [isEmpty()],
  dataEmissao: [isEmpty()],
  valor: [isEmpty()],
  parcelas: [isEmpty()],
};

const validationsEdit = {
  vencimento: [isEmpty()],
  valor: [isEmpty()],
};

const validationsPay = {
  dataPagamento: [isEmpty()],
  valorPago: [isEmpty()],
};

export function ContasAPagarFormScreen(props: FormScreenProps) {
  const {translate} = useTranslate();
  const context = useGlobalContext();
  const currency = context.getPersistValue('currency');
  const toast = useToast();
  const api = useContasAPagarModuleApi();
  const duplicatasTableConfig = useContasAPagarTableConfig();
  const navigate = useNavigate();
  const [form, setForm] = useForm({
    validations: props.type === 'create' ? validationsCreate : props.type === 'pay' ? validationsPay : validationsEdit,
  });
  const [duplicatas, setDuplicatas] = useStateWithHistory({
    values: [] as IDuplicatasContasAPagar[],
  });

  useEffect(() => {
    async function init() {
      if (props.id) {
        const response = await api.retornaContasAPagarPorId(props.id);
        if (props.type === 'pay') {
          const today = new Date();
          form.setInitialValues({
            ...response,
            valorPago: formatMoney(convertNumberToString(response.duplicatasContasAPagar[0].valor)),
            dataPagamento: today.toISOString().split('T')[0],
            valor: formatMoney(convertNumberToString(response.duplicatasContasAPagar[0].valor)),
            vencimento: response.duplicatasContasAPagar[0].dataVencimento,
            numeroFatura: `${response.duplicatasContasAPagar[0].numeroFatura}.${response.duplicatasContasAPagar[0].numeroParcela}`,
            observacao: response.duplicatasContasAPagar[0].observacao ?? '',
          });
        } else {
          form.setInitialValues({
            ...response,
            valor: formatMoney(convertNumberToString(response.duplicatasContasAPagar[0].valor)),
            vencimento: response.duplicatasContasAPagar[0].dataVencimento,
            numeroFatura: `${response.duplicatasContasAPagar[0].numeroFatura}.${response.duplicatasContasAPagar[0].numeroParcela}`,
            observacao: response.duplicatasContasAPagar[0]?.observacao ?? '',
          });
        }
      }
    }
    init();
  }, []);

  async function submit() {
    const valor =
      typeof form.getValue('valor') === 'number'
        ? form.getValue('valor')
        : parseFloat(form.values.valor.replaceAll('.', '').trim().replaceAll(',', '.') || '');

    switch (props.type) {
      case 'create': {
        let total = 0;
        let dateError = false;
        const duplicatasRequest = [...duplicatas.values];
        duplicatasRequest.forEach((duplicata: IDuplicatasContasAPagar) => {
          total = parseFloat((total + duplicata.valor).toFixed(2));
          if (duplicata.dataVencimento.replaceAll('-', '') < form.values.dataEmissao.replaceAll('-', ''))
            dateError = true;
        });
        if (parseFloat(total + '') !== parseFloat(valor))
          return toast.showErrorToast(
            translate('contasAPagar.errors.wrongValue', {
              valor: numberFormatterTwoDecimal.format(parseFloat(valor)),
              total: numberFormatterTwoDecimal.format(total),
            }),
          );
        if (dateError) return toast.showErrorToast('contasAPagar.errors.invalidInstallmentDates');

        duplicatasRequest.forEach((duplicata: IDuplicatasContasAPagar) => {
          delete duplicata.id;
        });

        let data: Partial<IContasAPagar> = cloneDeep(form.values);
        data.valor = valor;
        data.quantidadeParcela = duplicatas.values.length;
        data.duplicatasContasAPagar = duplicatas.values;
        if (data.fornecedor) {
          data.fornecedorId = data.fornecedor.id;
          delete data.fornecedor;
        }
        if (data.planoDeContas) {
          data.planoDeContasId = data.planoDeContas.id;
          delete data.planoDeContas;
        }
        if (data.banco) {
          data.bancoId = data.banco.id;
          delete data.banco;
        }
        if (data.portador) {
          data.portadorId = data.portador.id;
          delete data.portador;
        }

        await api.adicionarContasAPagar(data, () => {
          toast.showSuccessToast('global.success.register');
          form.clear();
          setDuplicatas({values: []});
        });
        break;
      }
      case 'edit': {
        if (
          form.getValue<string>('vencimento').split('T')[0].replaceAll('-', '') <
          form.getValue<string>('dataEmissao').split('T')[0].replaceAll('-', '')
        ) {
          return toast.showErrorToast('contasAPagar.errors.invalidInstallmentDates');
        }
        const request: EditContaRequest = {
          id: form.values.id,
          bancoId: form.values.banco?.id,
          observacao: form.values.observacao,
          planoDeContasId: form.values.planoDeContas?.id,
          portadorId: form.values.portador?.id,
          duplicatasContasAPagarEdit: {
            id: form.values.duplicatasContasAPagar[0].id || '',
            dataVencimento: form.values.vencimento,
            valor: valor as number,
          },
        };
        await api.editarContasAPagar(request, () => {
          navigate(-1);
          toast.showSuccessToast('global.success.edit');
        });
        break;
      }
      case 'pay': {
        const valorPago = parseFloat(
          form.getValue<string>('valorPago').replaceAll('.', '').trim().replaceAll(',', '.'),
        );
        await api.pagarConta(
          {
            id: form.values.duplicatasContasAPagar[0].id,
            dataPagamento: form.values.dataPagamento,
            valorPago: valorPago,
          },
          () => {
            toast.showSuccessToast('contasAPagar.pay.success');
            navigate(-1);
          },
        );
        break;
      }
    }
  }

  function generateInstallments(updateInstallments?: number) {
    if (form.getValue('primeiroVcto')) {
      const dataEmissao = parseInt(form.getValue<string>('dataEmissao').replaceAll('-', ''));
      const primeiroVencimento = parseInt(form.getValue<string>('primeiroVcto').replaceAll('-', ''));
      if (primeiroVencimento < dataEmissao) {
        return toast.showErrorToast('contasAPagar.errors.invalidDates');
      }
    }

    const valor = parseFloat(form.getValue<string>('valor').replaceAll('.', '').trim().replaceAll(',', '.'));
    const quantidadeParcela = updateInstallments ?? form.getValue<number>('parcelas');
    const valorParcela = (valor / quantidadeParcela).toFixed(2);
    const observacao = form.getValue('observacao') ? ' - ' + form.getValue<string>('observacao').trim() : '';

    const novasDuplicatas = [] as IDuplicatasContasAPagar[];
    let valorTotal = 0;

    for (let i = 1; i <= quantidadeParcela; i++) {
      const dataVencimento = generateDueDate(
        form.getValue<string>('dataEmissao'),
        form.getValue<string>('primeiroVcto'),
        i,
      );

      const parcela: IDuplicatasContasAPagar = {
        id: '' + i,
        observacao: `${translate('global.installment')}: ${i}/${quantidadeParcela}${observacao}`,
        dataVencimento,
        dataPagamento: null,
        valor: parseFloat(valorParcela),
        valorPago: 0,
        numeroFatura: `${form.getValue('numeroFatura')}`,
        numeroParcela: i.toString(),
        contasAPagarId: null,
      };
      novasDuplicatas.push(parcela);
      valorTotal += parseFloat(valorParcela);
    }

    if (valorTotal < valor) {
      const diferenca = parseFloat((valor - valorTotal).toFixed(2));
      novasDuplicatas[0].valor = parseFloat((novasDuplicatas[0].valor + diferenca).toFixed(2));
    } else {
      if (valorTotal > valor) {
        const diferenca = parseFloat((valorTotal - valor).toFixed(2));
        novasDuplicatas[0].valor = parseFloat((novasDuplicatas[0].valor - diferenca).toFixed(2));
      }
    }
    setDuplicatas({values: novasDuplicatas});
  }

  function deleteInstallment() {
    const installments = form.getValue<number>('parcelas');
    if (installments === 1) return;
    setForm('parcelas')(installments - 1);
    generateInstallments(installments - 1);
  }

  function renderPaymentDateDetails() {
    if (!form.values.duplicatasContasAPagar) return null;
    if (form.values.duplicatasContasAPagar[0].dataPagamento === null) return null;
    return (
      <FormField
        name="global.paymentDate"
        fieldType={FormFieldTypes.datePicker}
        value={form.values.duplicatasContasAPagar[0].dataPagamento}
        width={'19%'}
        minWidth={250}
        readonly
      />
    );
  }

  function renderPaymentAmountDetails() {
    if (!form.values.duplicatasContasAPagar) return null;
    if (
      form.values.duplicatasContasAPagar[0].valorPago === null ||
      form.values.duplicatasContasAPagar[0].valorPago === 0
    )
      return null;
    return (
      <FormField
        name={translate('contasAPagar.pay.paidAmount', {currency: currency})}
        fieldType={FormFieldTypes.textInput}
        value={formatMoney(convertNumberToString(form.values.duplicatasContasAPagar[0].valorPago))}
        width={'19%'}
        minWidth={250}
        readonly
      />
    );
  }

  return (
    <Screen
      title={props.title ?? ''}
      formButtons={props.type !== 'details'}
      onSave={() => form.trySave(submit)}
      footerMargin={props.type === 'details' ? '0px' : '15px 0px 0px 0px'}
      backButton
    >
      <FormRow gapSize="2%" marginTop="10px">
        <FormField
          name="global.supplier"
          fieldType={props.type !== 'create' ? FormFieldTypes.textInput : FormFieldTypes.autoFetchDropDown}
          value={
            props.type === 'create'
              ? form.getValue('fornecedor')
              : form.getValue('fornecedor') && form.getValue('fornecedor').nomeFornecedor
          }
          error={form.getError('fornecedor')}
          onChange={setForm('fornecedor')}
          width={'40%'}
          route="/ListaPaginacaoFornecedor"
          filterDataBy={'nomeFornecedor'}
          required={props.type === 'create'}
          readonly={props.type !== 'create'}
          minWidth={250}
        />
        <FormField
          name="global.document"
          fieldType={FormFieldTypes.textInput}
          value={props.type === 'create' ? form.getValue('numeroFatura') : form.getValue('numeroFatura')}
          error={form.getError('numeroFatura')}
          onChange={setForm('numeroFatura')}
          mask={onlyNumbers}
          width={'200px'}
          maxSize={15}
          required={props.type === 'create'}
          readonly={props.type !== 'create'}
          minWidth={250}
        />
      </FormRow>

      <FormField
        name="contasAPagar.create.accountPlan"
        filterDataBy={'descricao'}
        fieldType={
          props.type === 'details' || props.type === 'pay' ? FormFieldTypes.textInput : FormFieldTypes.autoFetchDropDown
        }
        value={
          props.type === 'create' || props.type === 'edit'
            ? form.getValue('planoDeContas')
            : form.getValue('planoDeContas') && form.getValue('planoDeContas').descricao
        }
        onChange={setForm('planoDeContas')}
        route="/ListaPaginacaoPlanoDeContas"
        readonly={props.type === 'details' || props.type === 'pay'}
        width={'40%'}
        minWidth={250}
      />

      <FormField
        name="global.carrier"
        filterDataBy="nomePortador"
        fieldType={
          props.type === 'details' || props.type === 'pay' ? FormFieldTypes.textInput : FormFieldTypes.autoFetchDropDown
        }
        value={
          props.type === 'create' || props.type === 'edit'
            ? form.getValue('portador')
            : form.getValue('portador') && form.getValue('portador').nomePortador
        }
        onChange={setForm('portador')}
        route="/ListaPaginacaoPortador"
        readonly={props.type === 'details' || props.type === 'pay'}
        width={'40%'}
        minWidth={250}
      />

      <FormField
        name="global.bank"
        filterDataBy="nome"
        fieldType={
          props.type === 'details' || props.type === 'pay' ? FormFieldTypes.textInput : FormFieldTypes.autoFetchDropDown
        }
        value={
          props.type === 'create' || props.type === 'edit'
            ? form.getValue('banco')
            : form.getValue('banco') && form.getValue('banco').nome
        }
        onChange={setForm('banco')}
        route="/ListaPaginacaoBanco"
        readonly={props.type === 'details' || props.type === 'pay'}
        width={'40%'}
        minWidth={250}
      />

      <FormField
        name="global.observation"
        fieldType={FormFieldTypes.textInput}
        value={form.getValue('observacao')}
        onChange={setForm('observacao')}
        readonly={props.type === 'details' || props.type === 'pay'}
        width={'40%'}
        maxSize={100}
        minWidth={250}
      />

      {props.type !== 'create' && (
        <FormRow gapSize="2%">
          {props.type !== 'pay' && (
            <FormField
              name="global.emission"
              fieldType={FormFieldTypes.datePicker}
              value={form.values && form.values.dataEmissao}
              width={'19%'}
              readonly
              minWidth={250}
            />
          )}

          <FormField
            name="global.dueDate"
            fieldType={FormFieldTypes.datePicker}
            value={form.getValue('vencimento')}
            onChange={setForm('vencimento')}
            error={form.getError('vencimento')}
            width={'19%'}
            minWidth={250}
            readonly={props.type === 'details' || props.type === 'pay'}
            required={props.type === 'edit'}
          />

          <FormField
            name={`${translate('global.value')} ${currency}`}
            fieldType={FormFieldTypes.textInput}
            value={form.getValue('valor')}
            onChange={(value: string) => setForm('valor')(formatMoney(value))}
            error={form.getError('valor')}
            width={'19%'}
            minWidth={250}
            readonly={props.type === 'details' || props.type === 'pay'}
            required={props.type === 'edit'}
          />

          {props.type !== 'pay' && renderPaymentDateDetails()}
          {props.type !== 'pay' && renderPaymentAmountDetails()}

          {props.type === 'pay' && (
            <>
              <FormField
                name="global.paymentDate"
                fieldType={FormFieldTypes.datePicker}
                value={form.getValue('dataPagamento')}
                onChange={setForm('dataPagamento')}
                required
                width={'19%'}
                minWidth={250}
              />
              <FormField
                name={translate('contasAPagar.pay.paidAmount', {currency})}
                fieldType={FormFieldTypes.textInput}
                value={form.getValue('valorPago')}
                error={form.getError('valorPago')}
                onChange={(value: string) => setForm('valorPago')(formatMoney(value))}
                width={'19%'}
                required
                minWidth={250}
              />
            </>
          )}
        </FormRow>
      )}

      {props.type === 'create' && (
        <>
          <FormRow gapSize="2%">
            <FormField
              name="global.emission"
              fieldType={FormFieldTypes.datePicker}
              value={form.getValue('dataEmissao')}
              error={form.getError('dataEmissao')}
              onChange={setForm('dataEmissao')}
              width={'19%'}
              required
              minWidth={250}
            />
            <FormField
              name={`${translate('global.value')} ${currency}`}
              fieldType={FormFieldTypes.textInput}
              value={form.getValue('valor')}
              error={form.getError('valor')}
              onChange={(value: string) => setForm('valor')(formatMoney(value))}
              width={'19%'}
              required
              minWidth={250}
            />
            <FormField
              name="contasAPagar.create.installments"
              fieldType={FormFieldTypes.textInput}
              value={form.getValue('parcelas')}
              error={form.getError('parcelas')}
              onChange={(value) => setForm('parcelas')(parseInt(value) === 0 ? 1 : parseInt(value) > 100 ? 100 : value)}
              mask={onlyNumbers}
              width={'19%'}
              maxSize={3}
              required
              minWidth={250}
            />
            <FormField
              name="contasAPagar.create.firstDueDate"
              fieldType={FormFieldTypes.datePicker}
              value={form.getValue('primeiroVcto')}
              onChange={setForm('primeiroVcto')}
              mask={onlyNumbers}
              width={'19%'}
              minWidth={250}
            />
          </FormRow>

          <DefaultButton
            type={ButtonType.confirm}
            text="contasAPagar.create.buttons.generateInstallments"
            buttonWidth="140px"
            marginBottom={15}
            marginTop={15}
            onClick={() => form.trySave(generateInstallments)}
          />

          <Spacer text="global.duplicates" marginBottom={15} />

          <DefaultTable
            tableName="contasAPagarCreate"
            data={duplicatas.values}
            columnDefinition={duplicatasTableConfig.generateConfigDuplicatas(
              () => form.trySave(deleteInstallment),
              duplicatas.values,
              (value: IDuplicatasContasAPagar[]) => setDuplicatas({values: value}),
              form.getValue<string>('dataEmissao'),
            )}
            editMode="row"
            viewHeight="300px"
          />
        </>
      )}
    </Screen>
  );
}
