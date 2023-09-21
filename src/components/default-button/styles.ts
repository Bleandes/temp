import styled from 'styled-components';
import {blackOrWhite} from '#helper/black-or-white';
import {Text} from '../text';
import {ButtonType} from './types';

export const ButtonText = styled(Text)``;

export const ButtonStyled = styled(styled.button``)<{
  buttonType: ButtonType;
  marginTop?: number;
  marginBottom?: number;
  buttonWidth?: string;
}>`
  background-color: ${(props) =>
    props.buttonType === ButtonType.confirm || props.buttonType === ButtonType.filter
      ? props.theme.colors.primary
      : props.buttonType === ButtonType.save
      ? props.theme.colors.primary
      : props.buttonType === ButtonType.include
      ? props.theme.colors.primary
      : props.buttonType === ButtonType.back
      ? props.theme.colors.grey
      : props.buttonType === ButtonType.remove
      ? props.theme.colors.red
      : 'transparent'};
  color: ${(props) =>
    props.buttonType === ButtonType.cancel
      ? props.theme.colors.blackWhiteInverter
      : props.theme.colors.white};
  min-width: ${(props) => (props.buttonWidth ? props.buttonWidth : '110px')};
  max-height: 30px;
  min-height: 30px;
  border: ${(props) =>
    props.buttonType === ButtonType.cancel
      ? '1px solid ' + props.theme.colors.blackWhiteInverter
      : 'none'};
  border-radius: 5px;
  margin-top: ${(props) => props.marginTop ?? 0}px;
  margin-bottom: ${(props) => props.marginBottom ?? 0}px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}c0;
  }

  & ${ButtonText} {
    font-weight: 500;
    font-size: ${(props) => props.theme.fontSize.small};
    color: ${(props) =>
      props.buttonType === ButtonType.save
        ? blackOrWhite(props.theme.colors.primary)
        : props.buttonType === ButtonType.cancel
        ? props.theme.colors.blackWhiteInverter
        : props.theme.colors.white};
  }
`;
