import styled from 'styled-components';
import {RowContainer} from '#components/styled-containers';
import {Text as BaseText} from '#components/text';

export const Button = styled.button`
  border: 1px solid transparent;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  border-radius: 10px;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 2px 2px 3px 3px ${(props) => props.theme.colors.lightGrey};
  padding: 5px;
`;

export const Row = styled(RowContainer)`
  width: 100%;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;
`;

export const Text = styled(BaseText)`
  font-size: ${(props) => props.theme.fontSize.tiny};
  margin-top: 5px;
`;
