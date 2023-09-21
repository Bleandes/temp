import Toggle from 'react-toggle';
import styled from 'styled-components';
import {ColumnContainer} from '../styled-containers';

export const ToggleContainer = styled(ColumnContainer)`
  .react-toggle--checked .react-toggle-track {
    background-color: ${(props) => props.theme.colors.primary};
  }

  .react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${(props) => props.theme.colors.primary};
  }

  .react-toggle-track {
    background-color: ${(props) => props.theme.colors.white};
  }
`;

export const ToggleTheme = styled(Toggle)`
  border: 1px solid black;
  border-radius: 15px;
`;
