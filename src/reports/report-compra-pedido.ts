//@ts-nocheck
import pdfMake from 'pdfmake/build/pdfmake';
import {StyleDictionary, TDocumentDefinitions} from 'pdfmake/interfaces';
import {MaskCnpj} from '#mask/mask';
import fonstPdfMake from './fontsPdfMake.json';
import {IReport} from './types';

export let pdfByte: string = '';

export function ReportCompraPedido(report: IReport) {
  if (!report.dadosRodaPe) {
    report.dadosRodaPe = [];
    report.dadosRodaPe.push(['']);
  }
  if (!report.widthsRodape) report.widthsRodape = [''];

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
    bodyTableFooter: {
      fontSize: 8,
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
      alignment: 'left',
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

  const details = [
    {
      columns: [
        {
          text: `${report.nomeEmpresa} \n\n ${report.title} \n\n`,
          style: ['header', 'quote'],
        },
        {
          text: `Data:${new Date().toLocaleDateString()} \n\n Hora: ${new Date().toLocaleTimeString()} \n\n`,
          style: ['subheader'],
        },
      ],
    },
    {
      columns: [
        {
          text: `CNPJ : ${MaskCnpj(report.cnpj ? report.cnpj : '')} \n\n Telefone : ${report.telefone} \n\n Contato : ${
            report.contato
          } \n\n`,
          style: ['headerTable', 'quote'],
        },
      ],
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
    {
      layout: 'lightHorizontalLines',
      table: {
        headerRows: 1,
        style: 'tableExample',
        widths: [
          ...report.widthsRodape.map((x) => {
            return x;
          }),
        ],
        body: [
          ...report.dadosRodaPe.map((row) =>
            row.map((cell: any) => {
              return {
                text: cell,
                style: 'bodyTableFooter',
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
      return {text: `Pag. ${currentPage.toString()}`, style: 'footer'};
    },
  };

  const pdfDocGenerator = pdfMake.createPdf(doc);
  pdfDocGenerator.getBase64((base: any) => {
    pdfByte = base;
  });

  if (report.openPdf) {
    pdfDocGenerator.open();
  }
}
