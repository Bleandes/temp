import ModeEditIcon from '@mui/icons-material/ModeEdit';
import styled from 'styled-components';

export const EditButton = styled.button`
  border: 1px solid black;
  padding: 5px 10px 5px 10px;
  border-radius: 50px;
  background-color: transparent;
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

export const EditIcon = styled(ModeEditIcon)`
  color: ${(props) => props.theme.colors.blackWhiteInverter};
  margin-right: 5px;
`;
