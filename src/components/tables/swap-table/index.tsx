import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {cloneDeep} from 'lodash';
import {useState} from 'react';
import {useTheme} from 'styled-components';
import {SwapTableOperationType, SwapTableProps} from './types';
import {DefaultTable} from '../default-table';
import * as S from './styles';
import {useTranslate} from '#hooks/use-translate';

export function SwapTable(props: SwapTableProps) {
  const {translate} = useTranslate();
  const [leftSelected, setLeftSelected] = useState<string[]>([]);
  const [rightSelected, setRightSelected] = useState<string[]>([]);
  const theme = useTheme();

  function leftArrowClick() {
    leftTableManager(rightSelected, 'add');
    rightTableManager(rightSelected, 'remove');
    setRightSelected([]);
  }

  function rightArrowClick() {
    leftTableManager(leftSelected, 'remove');
    rightTableManager(leftSelected, 'add');
    setLeftSelected([]);
  }

  function leftTableManager(ids: string[], actionType: SwapTableOperationType) {
    if (ids.length === 0) return;
    let newLeftData: any[] = [];
    if (actionType === 'add') {
      newLeftData = cloneDeep(props.leftData);
      props.rightData.forEach((element: any) => {
        if (ids.includes(element.id)) newLeftData.push(element);
      });
    } else {
      props.leftData.forEach((element: any) => {
        if (!ids.includes(element.id)) newLeftData.push(element);
      });
    }
    return props.setLeftData(newLeftData);
  }

  function rightTableManager(ids: any[], actionType: SwapTableOperationType) {
    if (ids.length === 0) return;
    let newRightData: any[] = [];
    if (actionType === 'add') {
      newRightData = cloneDeep(props.rightData);
      props.leftData.forEach((element: any) => {
        if (ids.includes(element.id)) newRightData.push(element);
      });
    } else {
      props.rightData.forEach((element: any) => {
        if (!ids.includes(element.id)) newRightData.push(element);
      });
    }
    return props.setRightData(newRightData);
  }

  return (
    <S.TableView viewHeight={props.viewHeight} margin={props.margin} viewWidth={props.viewWidth}>
      <S.LeftColumn width={props.leftWidth}>
        {props.leftTableName && (
          <S.TitleTextView color={theme.colors.primary}>{translate(props.leftTableName)}</S.TitleTextView>
        )}
        <DefaultTable
          columnDefinition={props.leftColumnDefinition}
          data={props.leftData}
          checkBoxCollum={!props.readonly}
          selectedCheckBoxes={leftSelected}
          setSelectedCheckBoxes={(selected: any[]) => setLeftSelected(selected)}
        />
      </S.LeftColumn>
      <S.MidColumn>
        <S.DividerColumnUpper onClick={rightArrowClick}>
          <ArrowForwardIcon
            fontSize="large"
            sx={{
              border: '2px solid black',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          ></ArrowForwardIcon>
        </S.DividerColumnUpper>
        <S.DividerColumnLower onClick={leftArrowClick}>
          <ArrowBackIcon
            fontSize="large"
            sx={{
              border: '2px solid black',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          ></ArrowBackIcon>
        </S.DividerColumnLower>
      </S.MidColumn>
      <S.RightColumn width={props.rigthWidth}>
        {props.rightTableName && (
          <S.TitleTextView color={theme.colors.primary}>{translate(props.rightTableName)}</S.TitleTextView>
        )}
        <DefaultTable
          columnDefinition={props.rightColumnDefinition}
          data={props.rightData}
          checkBoxCollum={!props.readonly}
          selectedCheckBoxes={rightSelected}
          setSelectedCheckBoxes={(selected: any[]) => setRightSelected(selected)}
        ></DefaultTable>
      </S.RightColumn>
    </S.TableView>
  );
}
