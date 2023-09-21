import {FiSearch} from 'react-icons/fi';
import styled from 'styled-components';

export const FilterView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 10px;
  background-color: transparent;
  width: 100%;
  min-height: 40px;
  margin: 15px 0px 10px 0px;
`;

export const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  ::placeholder {
    font-weight: 400;
    opacity: 0.7;
    color: ${(props) => props.theme.colors.blackWhiteInverter};
    font-size: ${(props) => props.theme.fontSize.smaller};
  }
`;

export const SearchIcon = styled(FiSearch)`
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  font-size: 20px;
  margin-right: 10px;
`;
