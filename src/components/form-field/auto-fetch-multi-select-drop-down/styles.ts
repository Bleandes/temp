// import {StylesConfig} from 'react-select';
import styled, {useTheme} from 'styled-components';

// export function useMultiSelectDropdownStyles() {
//   const theme = useTheme();
//   function generateStyles() {
//     return {
//       control: (provided) => ({
//         ...provided,
//         padding: 0,
//         position: 'relative',
//         background: 'transparent',
//         border: 'none',
//         display: 'flex',
//         maxHeight: '100px',
//         overflowY: 'auto',
//       }),
//       menu: () => ({
//         background: 'transparent',
//         borderRadius: '4px',
//       }),
//       menuList: () => ({
//         zIndex: '10',
//         background: theme.colors.backgroundColor,
//         borderBottomLeftRadius: '5px',
//         overflowY: 'scroll',
//         overflowX: 'hidden',
//         height: '250px',
//         width: '100%',
//         position: 'absolute',
//         color: theme.colors.blackWhiteInverter,
//       }),
//       multiValue: () => ({
//         position: 'relative',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         backgroundColor: theme.colors.yellow,
//         border: 'none',
//         borderRadius: '5px',
//         padding: '2px',
//         margin: '3px 5px',
//       }),
//       multiValueLabel: () => ({
//         color: theme.colors.brown,
//       }),
//       multiValueRemove: () => ({
//         color: theme.colors.brown,
//         marginLeft: '4px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }),
//       valueContainer: (provided) => ({
//         ...provided,
//         overflow: 'visible',
//       }),
//       dropdownIndicator: (provided) => ({
//         ...provided,
//         visibility: 'hidden',
//       }),
//       clearIndicator: (provided) => ({
//         ...provided,
//         visibility: 'hidden',
//       }),
//     } as StylesConfig;
//   }

//   return {
//     generateStyles,
//   };
// }

export const SelectContainer = styled.div`
  width: 100%;
`;
