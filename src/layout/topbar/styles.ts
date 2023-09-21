import styled from 'styled-components';
import {RowContainer} from '#components/styled-containers';

export const TopBarWrapper = styled(RowContainer)`
  width: 100%;
  min-height: 60px;
  margin: 15px 0px 15px 0px;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 5px;
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
`;
