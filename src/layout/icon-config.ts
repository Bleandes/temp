import {IconType} from 'react-icons/lib';
import {
  MdApartment,
  MdEmail,
  MdLocalAtm,
  MdOutlineAccountCircle,
  MdOutlineCreateNewFolder,
  MdOutlineCurrencyExchange,
  MdOutlineInventory2,
  MdOutlineRequestQuote,
  MdOutlineRoomPreferences,
  MdOutlineSettings,
  MdPrint,
  MdProductionQuantityLimits,
  MdShoppingCart,
} from 'react-icons/md';
import {TbFileSearch} from 'react-icons/tb';
import styled from 'styled-components';

function moduloIconFactory(type: IconType) {
  return styled(type)<{size?: number; color?: string}>`
    color: ${(props) => props.color ?? props.theme.colors.white};
    font-size: ${(props) => props.size ?? 25}px;
  `;
}

function categoriaIconFactory(type: IconType) {
  return styled(type)<{size?: number; color?: string}>`
    color: ${(props) => props.color ?? props.theme.colors.white};
    font-size: ${(props) => props.size ?? 25}px;
  `;
}

export const Cadastros = moduloIconFactory(MdOutlineCreateNewFolder);
export const Estoque = moduloIconFactory(MdOutlineInventory2);
export const Financeiro = moduloIconFactory(MdOutlineCurrencyExchange);
export const FaltasEncomendas = categoriaIconFactory(MdProductionQuantityLimits);
export const Configuracoes = moduloIconFactory(MdOutlineSettings);
export const Emails = categoriaIconFactory(MdEmail);
export const Compras = categoriaIconFactory(MdShoppingCart);
export const ConsultaDePedidos = categoriaIconFactory(TbFileSearch);
export const EstoqueCategoria = categoriaIconFactory(MdOutlineInventory2);
export const FinanceiroCategoria = categoriaIconFactory(MdLocalAtm);
export const Geral = categoriaIconFactory(MdOutlineRoomPreferences);
export const Acessos = categoriaIconFactory(MdOutlineAccountCircle);
export const ContasAPagar = categoriaIconFactory(MdOutlineRequestQuote);
export const Relatorios = categoriaIconFactory(MdPrint);
export const Empresa = categoriaIconFactory(MdApartment);
