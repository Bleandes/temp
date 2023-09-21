import {RowContainer} from '#components/styled-containers';
import {Text} from '#components/text';
import styled from 'styled-components';

export const StyledText = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.smaller};
  margin-left: 10px;
`;

export const StyledRow = styled(RowContainer)`
  align-items: flex-start;
  margin-right: 15px;
  height: 40px;
`;

export const StyledInternalRow = styled(RowContainer)`
  align-items: center;
`;
