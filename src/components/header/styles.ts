import {AiOutlineEdit} from 'react-icons/ai';
import styled from 'styled-components';
import {blackOrWhite} from '#helper/black-or-white';
import {Text as BaseText} from '../text';

export const ContainerHeaderMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};
  width: 100%;
  min-height: 40px;
  margin: 0px !important;
`;

export const TitleMainHeader = styled(BaseText)`
  font-size: ${(props) => props.theme.fontSize.big};
  color: ${(props) => props.theme.colors.primary};
  font-weight: 800;
  min-width: 500px;
  margin: 0px !important;
`;

export const EditButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  max-height: 30px;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}c0;
  }
`;

export const Text = styled(BaseText)`
  color: ${(props) => blackOrWhite(props.theme.colors.primary)};
  font-size: ${(props) => props.theme.fontSize.small};
`;

export const EditIcon = styled(AiOutlineEdit)`
  color: ${(props) => blackOrWhite(props.theme.colors.primary)};
  margin-right: 5px;
  font-size: 18px;
`;
