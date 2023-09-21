import {useEffect, useState} from 'react';
import {useRelatorioContasPagasModuleApi} from './api';
import {IFiltroContasPagas} from './types';
import {useGlobalContext} from '#hooks/use-global-context';
import {DefaultButton} from '#components/default-button';
import {ButtonType} from '#components/default-button/types';
import {FormFieldTypes} from '#components/form-field/types';
import {FormField} from '#components/form-field';
import {FormRow} from '#components/form-field/styles';
import {Spacer} from '#components/spacer';
import {Screen} from '#components/screen';
import {isEmpty} from '#helper/form-validations';
import {useTranslate} from '#hooks/use-translate';
import {useFornecedorModuleApi} from '#pages/fornecedor/api';
import {useReportContasPagas} from '#reports/report-contas-pagas';
import {useToast} from '#components/toast';
import {useForm} from '#hooks/use-form';
import {IFornecedor} from '#pages/fornecedor/types';
import {IReport} from '#reports/types';
import moment from 'moment';

const validations = {
  startDate: [isEmpty()],
  endDate: [isEmpty()],
};

function RelatorioContasPagas() {
  const context = useGlobalContext();
  const {translate} = useTranslate();
  const fornecedorApi = useFornecedorModuleApi();
  const report = useReportContasPagas();
  const api = useRelatorioContasPagasModuleApi();
  const toast = useToast();
  const radioOptions = [translate('global.payment'), translate('global.dueDate')];
  const [form, setForm] = useForm({
    validations,
    initialValues: {classification: 0},
  });
  const [fornecedores, setFornecedores] = useState<IFornecedor[]>([]);

  useEffect(() => {
    const init = async () => {
      const response = await fornecedorApi.listaFornecedor();
      setFornecedores(response);
    };
    init();
  }, []);

  async function submit() {
    const startDate = parseInt(form.getValue<string>('startDate').replaceAll('-', ''));
    const endDate = parseInt(form.getValue<string>('endDate').replaceAll('-', ''));

    if (endDate < startDate) {
      return toast.showErrorToast('relatorioContasAPagar.errors.invalidDates');
    }

    const filtroData: IFiltroContasPagas = {
      fornecedorId: form.getValue<IFornecedor>('supplier') ? form.getValue<IFornecedor>('supplier').id : null,
      dataInicial: form.getValue<string>('startDate'),
      dataFinal: form.getValue<string>('endDate'),
      classificacao: form.getValue<number>('classification'),
    };

    if (filtroData.fornecedorId === '') {
      const response = await api.relatorioContasPagas(filtroData);

      if (response.length > 0) {
        GerarPdf(response);
      } else {
        toast.showErrorToast('relatorioContasPagas.errors.noData');
      }
    } else {
      const response = await api.relatorioContasPagasPorFornecedor(filtroData);

      if (response.length > 0) {
        GerarPdf(response);
      } else {
        toast.showErrorToast('relatorioContasPagas.errors.noData');
      }
    }
  }

  function GerarPdf(data: any[]) {
    let dadosReport = [] as string[][];
    let dataPgto: number;
    let index = 0;
    let totalValor = 0;
    let totalPago = 0;
    let totalDiferenca = 0;
    let primeiroDia;
    let totalGeral = 0;
    let totalGeralPago = 0;
    let totalGeralDif = 0;

    data.map((item: {duplicatasContasAPagar: any[]; fornecedor: {nomeFornecedor: string}}) => {
      item.duplicatasContasAPagar.map(
        (x: {dataPagamento: string; dataVencimento: string; observacao: string; valor: number; valorPago: number}) => {
          primeiroDia = parseInt(x.dataPagamento.replaceAll('-', ''));

          if (index > 0 && dataPgto != primeiroDia) {
            dadosReport.push([
              translate('relatorioContasPagas.dayTotal'),
              '',
              '',
              '',
              totalValor.toLocaleString('pt-BR'),
              totalPago.toLocaleString('pt-BR'),
              '',
              totalDiferenca.toLocaleString('pt-BR'),
            ]);

            totalValor = 0;
            totalPago = 0;
            totalDiferenca = 0;
          }

          let nomeFornecedor = '';
          let dataPagamento = '';

          if (item.fornecedor) {
            nomeFornecedor = item.fornecedor.nomeFornecedor;
          }
          if (x.dataPagamento) {
            dataPagamento = x.dataPagamento.slice(0, 10);
          }

          let dataVcto = parseInt(x.dataVencimento.slice(0, 10).replaceAll('-', ''));
          dataPgto = parseInt(dataPagamento.replaceAll('-', ''));

          const dataPgtoWithMoment = moment(dataPgto, 'YYYY/MM/DD');
          const dataVctoWithMoment = moment(dataVcto, 'YYYY/MM/DD');

          let diffDias = dataPgtoWithMoment.diff(dataVctoWithMoment, 'days');

          dadosReport.push([
            moment(x.dataVencimento).format('DD/MM/YYYY'),
            nomeFornecedor.length > 15 ? nomeFornecedor.slice(0, 15) : nomeFornecedor,
            moment(dataPagamento).format('DD/MM/YYYY'),
            x.observacao ? x.observacao.slice(0, 25) : '',
            x.valor.toLocaleString('pt-BR'),
            x.valorPago.toLocaleString('pt-BR'),
            diffDias.toLocaleString('pt-BR'),
            (x.valorPago - x.valor).toLocaleString('pt-BR'),
          ]);
          totalGeral += x.valor;
          totalGeralPago += x.valorPago;
          totalGeralDif += x.valorPago - x.valor;
          totalValor += x.valor;
          totalPago += x.valorPago;
          totalDiferenca += x.valorPago - x.valor;

          index += 1;
        },
      );
    });

    dadosReport.push([
      translate('relatorioContasPagas.dayTotal'),
      '',
      '',
      '',
      totalValor.toLocaleString('pt-BR'),
      totalPago.toLocaleString('pt-BR'),
      '',
      totalDiferenca.toLocaleString('pt-BR'),
    ]);

    dadosReport.push([
      translate('relatorioContasPagas.total'),
      '',
      '',
      '',
      totalGeral.toLocaleString('pt-BR'),
      totalGeralPago.toLocaleString('pt-BR'),
      '',
      totalGeralDif.toLocaleString('pt-BR'),
    ]);

    let dataReport: IReport = {
      title:
        form.getValue<number>('classification') == 1
          ? translate('relatorioContasPagas.duplicatedDueDate')
          : translate('relatorioContasPagas.duplicatedPayment'),
      nomeEmpresa: context.getPersistValue('sessionInfo')?.razaoSocial,
      perido: {
        dataInicial: form.getValue<string>('startDate'),
        dataFinal: form.getValue<string>('endDate'),
      },
      cabecalho: [
        translate('global.dueDate'),
        translate('global.supplier'),
        translate('global.payment'),
        translate('global.observation'),
        translate('relatorioContasPagas.report.value'),
        translate('relatorioContasPagas.report.paidValue'),
        translate('global.days'),
        translate('relatorioContasPagas.report.paymentDifference'),
      ],
      widths: ['11%', '15%', '11,5%', '23,5%', '8%', '13,5%', '5%', '12,5%'],
      dados: dadosReport,
    };

    report.reportContasPagas(dataReport);
  }

  return (
    <Screen title={translate('relatorioContasPagas.title')}>
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
        data={fornecedores}
        name={'global.supplier'}
        value={form.getValue('supplier')}
        onChange={setForm('supplier')}
        filterDataBy={'nomeFornecedor'}
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
    path: '/relatorio-contas-pagas',
    element: () => <RelatorioContasPagas />,
  },
];
