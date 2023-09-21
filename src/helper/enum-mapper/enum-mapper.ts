import {StatusCompra, StatusCotacao, StatusPedidoCotacao, TipoCompra} from '#pages/compras/types';
import {CurvaAbc} from '#pages/produto/types';
import {TipoUnidade} from '#pages/unidade/types';

export function getTipoCompraString(tipoCompra: number): string {
  switch (tipoCompra) {
    case TipoCompra.VENDA:
      return 'enumTranslate.tipoCompra.venda';
    case TipoCompra.DEMANDA:
      return 'enumTranslate.tipoCompra.demanda';
    case TipoCompra.ESTOQUE_MINIMO:
      return 'enumTranslate.tipoCompra.estoqueMinimo';
    case TipoCompra.ESTOQUE_MAXIMO:
      return 'enumTranslate.tipoCompra.estoqueMaximo';
    case TipoCompra.CONSUMO:
      return 'enumTranslate.tipoCompra.consumo';
    case TipoCompra.ENCOMENDA_FALTAS:
      return 'enumTranslate.tipoCompra.encomendasFaltas';
    default:
      return '';
  }
}

export function getCurvaAbcString(curvaAbc: number): string {
  switch (curvaAbc) {
    case CurvaAbc.GERAL:
      return 'enumTranslate.curvaAbc.geral';
    case CurvaAbc.A:
      return 'A';
    case CurvaAbc.B:
      return 'B';
    case CurvaAbc.C:
      return 'C';
    default:
      return '';
  }
}

export function getStatusCompraString(statusCompra: number): string {
  switch (statusCompra) {
    case StatusCompra.EMABERTO:
      return 'enumTranslate.statusCompra.emAberto';
    case StatusCompra.PARCIAL:
      return 'enumTranslate.statusCompra.parcial';
    case StatusCompra.COMPLETO:
      return 'enumTranslate.statusCompra.completo';
    case StatusCompra.CANCELADO:
      return 'enumTranslate.statusCompra.cancelado';
    default:
      return '';
  }
}

export function getStatusPedidoCotacaoString(statusPedidoCotacao: number): string {
  switch (statusPedidoCotacao) {
    case StatusPedidoCotacao.ENVIADOCOTACAO:
      return 'enumTranslate.statusPedidoCotacao.enviadoCotacao';
    case StatusPedidoCotacao.ENVIADOPEDIDO:
      return 'enumTranslate.statusPedidoCotacao.enviadoPedido';
    case StatusPedidoCotacao.FINALIZADO:
      return 'enumTranslate.statusPedidoCotacao.finalizado';
    case StatusPedidoCotacao.NAOENVIADO:
      return 'enumTranslate.statusPedidoCotacao.naoEnviado';
    default:
      return '';
  }
}

export function getStatusCotacaoString(statusCotacao: number): string {
  switch (statusCotacao) {
    case StatusCotacao.AEMITIR:
      return 'enumTranslate.statusCotacao.aEmitir';
    case StatusCotacao.REJEITADA:
      return 'enumTranslate.statusCotacao.rejeitada';
    case StatusCotacao.EMITIDA:
      return 'enumTranslate.statusCotacao.emitida';
    case StatusCotacao.PROCESSADA:
      return 'enumTranslate.statusCotacao.processada';
    default:
      return '';
  }
}

export function getTipoUnidadeString(tipoUnidade: number): string {
  switch (tipoUnidade) {
    case TipoUnidade.MASSA:
      return 'global.mass';
    case TipoUnidade.VOLUME:
      return 'global.volume';
    default:
      return '';
  }
}
