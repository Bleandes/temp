import {useState} from 'react';
import {useTranslate} from '#hooks/use-translate';
import * as S from './styles';
import {TabConfigProps, TabsProps} from './types';

export function useTabSystem() {
  const [currentTab, setCurrentTab] = useState(0);
  const {translate} = useTranslate();

  function Tab(props: TabConfigProps) {
    return (
      <S.Tab onClick={props.onPress} isSelected={currentTab === props.tabIndex}>
        <S.StyledTabName isSelected={currentTab === props.tabIndex}>
          {translate(props.name)}
        </S.StyledTabName>
      </S.Tab>
    );
  }

  function Tabs(props: TabsProps) {
    return (
      <S.StyledRow>
        {props.tabConfig.map((tabConfig: string, index: number) => (
          <Tab name={tabConfig} onPress={() => setCurrentTab(index)} tabIndex={index} key={index} />
        ))}
      </S.StyledRow>
    );
  }

  return {
    currentTab,
    TabManager: Tabs,
  };
}
