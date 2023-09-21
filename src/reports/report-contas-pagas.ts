//@ts-nocheck
import moment from 'moment';
import {StyleDictionary, TDocumentDefinitions} from 'pdfmake/interfaces';
import {useTranslate} from '#hooks/use-translate';
import {IReport} from './types';
import fonstPdfMake from './fonts-pdf-make.json';
import pdfMake from 'pdfmake/build/pdfmake';

export function useReportContasPagas() {
  const {translate} = useTranslate();

  function reportContasPagas(report: IReport) {
    pdfMake.vfs = fonstPdfMake;

    const stylesParameters: StyleDictionary = {
      headerTable: {
        fontSize: 7,
        bold: true,
        alignment: 'left',
      },
      bodyTable: {
        fontSize: 5,
        bold: false,
        alignment: 'left',
      },
      bodyTableBold: {
        fontSize: 7,
        bold: true,
        alignment: 'left',
      },
      header: {
        fontSize: 12,
        bold: true,
        alignment: 'center',
        margin: [0, 10, 0, 5],
      },
      subheader: {
        fontSize: 8,
        alignment: 'right',
      },
      periodo: {
        fontSize: 8,
        alignment: 'left',
      },
      footer: {
        fontSize: 8,
        bold: true,
        alignment: 'right',
        margin: [0, 0, 10, 0],
      },
    };

    var columns = [];

    if (report.perido) {
      columns.push({
        text: `${translate('global.period')}: ${moment(report.perido.dataInicial).format('DD/MM/YYYY')} a ${moment(
          report.perido.dataFinal,
        ).format('DD/MM/YYYY')} \n\n`,
        style: ['periodo'],
      });
    }

    const details = [
      {
        columns: [
          {
            text: `${report.nomeEmpresa} \n\n ${report.title} \n\n`,
            style: ['header', 'quote'],
          },
          {
            text: `${translate('global.date')}:${new Date().toLocaleDateString()} \n\n ${translate(
              'global.hour',
            )}: ${new Date().toLocaleTimeString()} \n\n`,
            style: ['subheader'],
          },
        ],
      },
      {
        columns,
      },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          style: 'tableExample',
          widths: [
            ...report.widths.map((x) => {
              return x;
            }),
          ],

          body: [
            [
              ...report.cabecalho.map((x) => {
                return {
                  text: x,
                  style: ['headerTable', 'quote'],
                };
              }),
            ],

            ...report.dados.map((row) =>
              row.map((cell: any) => {
                if (!row[1]) {
                  return {
                    text: cell,
                    style: 'bodyTableBold',
                  };
                }

                return {
                  text: cell,
                  style: 'bodyTable',
                };
              }),
            ),
          ],
        },
      },
    ];

    const doc: TDocumentDefinitions = {
      pageOrientation: report.orientation ? 'landscape' : 'portrait',
      content: [details],
      styles: stylesParameters,
      footer: function (currentPage, pageCount) {
        return {
          text: `${translate('global.page')} ${currentPage.toString()}`,
          style: 'footer',
        };
      },
    };
    pdfMake.createPdf(doc).open();
  }

  return {
    reportContasPagas,
  };
}
