import {useToast} from '#components/toast';
import {isEmpty} from '#helper/form-validations';
import {useTranslate} from '#hooks/use-translate';
import {useFornecedorModuleApi} from '#pages/fornecedor/api';
import {IFornecedor} from '#pages/fornecedor/types';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {IFiltroContasAPagar, IPlanoDeConta} from './types';
import {useForm} from '#hooks/use-form';
import {useGlobalContext} from '#hooks/use-global-context';
import {IReport} from '#reports/types';
import {FormField} from '#components/form-field';
import {FormFieldTypes} from '#components/form-field/types';
import {Spacer} from '#components/spacer';
import {DefaultButton} from '#components/default-button';
import {FormRow} from '#components/form-field/styles';
import {ButtonType} from '#components/default-button/types';
import {Screen} from '#components/screen';
import {useRelatorioContasAPagarModuleApi} from './api';
import {useReportContasPagas} from '#reports/report-contas-pagas';

const validations = {
  startDate: [isEmpty()],
  endDate: [isEmpty()],
};

function RelatorioContasAPagar() {
  const {translate} = useTranslate();
  const report = useReportContasPagas();
  const api = useRelatorioContasAPagarModuleApi();
  const fornecedorApi = useFornecedorModuleApi();
  const toast = useToast();
  const context = useGlobalContext();
  const currency = context.getPersistValue('currency');
  const radioOptions = [translate('global.period'), translate('global.supplier')];
  const [form, setForm] = useForm({
    validations,
    initialValues: {classification: 0},
  });
  const [fornecedores, setFornecedores] = useState<IFornecedor[]>([]);
  const [planoDeContas, setPlanoDeContas] = useState<IPlanoDeConta[]>([]);

  useEffect(() => {
    async function init() {
      const fornecedoresResponse = await fornecedorApi.listaFornecedor();
      setFornecedores(fornecedoresResponse);
      const planoDeContasResponse = await api.listaPlanoDeContas();
      setPlanoDeContas(planoDeContasResponse);
    }
    init();
  }, []);

  async function submit() {
    if (form.getValue<number>('classification') === 1 && !form.getValue('supplier')) {
      return toast.showErrorToast('relatorioContasAPagar.errors.supplier');
    }
    const startDate = parseInt(form.getValue<string>('startDate').replaceAll('-', ''));
    const endDate = parseInt(form.getValue<string>('endDate').replaceAll('-', ''));

    if (endDate < startDate) {
      return toast.showErrorToast('relatorioContasAPagar.errors.invalidDates');
    }

    const body: IFiltroContasAPagar = {
      classificacao: form.getValue<number>('classification'),
      dataInicial: form.getValue<string>('startDate'),
      dataFinal: form.getValue<string>('endDate'),
      fornecedorId:
        form.getValue<IFornecedor>('supplier') && form.getValue<number>('classification') === 1
          ? form.getValue<IFornecedor>('supplier').id
          : null,
      planoDeContasId:
        form.getValue<IPlanoDeConta>('planoDeContas') && form.getValue<number>('classification') === 0
          ? form.getValue<IPlanoDeConta>('planoDeContas').id
          : null,
    };

    if (form.getValue<number>('classification') === 0) {
      const response = await api.relatorioContasAPagarPorPlanoDeContas(body);
      if (response) {
        if (response.length > 0) {
          GerarPdf(response);
        } else {
          toast.showErrorToast('relatorioContasAPagar.errors.noData');
        }
      }
    } else {
      const response = await api.relatorioContasAPagarPorFornecedor(body);
      if (response) {
        if (response.length > 0) {
          GerarPdf(response);
        } else {
          toast.showErrorToast('relatorioContasAPagar.errors.noData');
        }
      }
    }
  }

  function GerarPdf(data: any[]) {
    let dadosReport = [] as string[][];
    data.map((item: {duplicatasContasAPagar: any[]; fornecedor: {nomeFornecedor: string}}) => {
      item.duplicatasContasAPagar.map((x: {dataVencimento: string; numeroFatura: string; valor: number}) => {
        let nomeFornecedor = '';

        if (item.fornecedor) {
          nomeFornecedor = item.fornecedor.nomeFornecedor;
        }
        dadosReport.push([
          moment(x.dataVencimento).format('DD/MM/YYYY'),
          x.numeroFatura,
          nomeFornecedor.slice(0, 15),
          x.valor.toString(),
        ]);
      });
    });

    let dataReport: IReport = {
      title:
        form.getValue<number>('classification') === 1
          ? translate('relatorioContasAPagar.report.supplier')
          : translate('relatorioContasAPagar.report.regular'),
      nomeEmpresa: context.getPersistValue('sessionInfo')?.razaoSocial,
      perido: {
        dataInicial: form.getValue<string>('startDate'),
        dataFinal: form.getValue<string>('endDate'),
      },
      cabecalho: [
        translate('global.endDate'),
        translate('global.duplicate'),
        translate('global.supplier'),
        translate('global.value') + ' (' + currency + ')',
      ],
      widths: ['15%', '15%', '50%', '20%'],
      dados: dadosReport,
    };

    report.reportContasPagas(dataReport);
  }

  return (
    <Screen title="relatorioContasAPagar.title">
      <FormRow marginTop="10px">
        <FormField
          fieldType={FormFieldTypes.radioButtons}
          name="global.classification"
          value={form.getValue('classification')}
          onChange={setForm('classification')}
          width={'20%'}
          options={radioOptions}
          returnIndexRadioButtons
        />
      </FormRow>

      <Spacer text="global.selection" marginBottom={20} marginTop={20} />

      <FormField
        fieldType={FormFieldTypes.dropDown}
        data={form.getValue<number>('classification') === 0 ? planoDeContas : fornecedores}
        name={form.getValue<number>('classification') === 0 ? 'relatorioContasAPagar.accountPlan' : 'global.supplier'}
        value={
          form.getValue<number>('classification') === 0 ? form.getValue('planoDeContas') : form.getValue('supplier')
        }
        onChange={form.getValue<number>('classification') === 0 ? setForm('planoDeContas') : setForm('supplier')}
        filterDataBy={form.getValue<number>('classification') === 0 ? 'descricao' : 'nomeFornecedor'}
        required={form.getValue<number>('classification') !== 0}
        width={'41%'}
      />

      <FormRow gapSize="1%">
        <FormField
          fieldType={FormFieldTypes.datePicker}
          name="global.startDate"
          value={form.getValue('startDate')}
          onChange={setForm('startDate')}
          error={form.getError('startDate')}
          width={'20%'}
          required
        />
        <FormField
          fieldType={FormFieldTypes.datePicker}
          name="global.endDate"
          value={form.getValue('endDate')}
          onChange={setForm('endDate')}
          error={form.getError('endDate')}
          width={'20%'}
          required
        />
      </FormRow>

      <DefaultButton type={ButtonType.confirm} marginTop={20} onClick={() => form.trySave(submit)} />
    </Screen>
  );
}

export const routes = [
  {
    path: '/relatorio-contas-a-pagar',
    element: () => <RelatorioContasAPagar />,
  },
];
