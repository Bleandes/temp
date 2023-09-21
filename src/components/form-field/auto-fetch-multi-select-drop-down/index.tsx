import {debounce} from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import {IPagination, ListaPaginacaoResponse} from '#components/tables/auto-fetch-table/types';
import {useApi} from '#hooks/use-api';
import {useStateWithHistory} from '#hooks/use-state-with-history';
import * as S from './styles';
import {MultiSelectDropDownProps} from './types';

const delay = import.meta.env.VITE_AUTO_FETCH_MULTISELECT_DROPDOWN_DELAY;
export function AutoFetchMultiSelectDropDown(props: MultiSelectDropDownProps) {
  const getData = useApi<ListaPaginacaoResponse>('GET', `${props.route}`, {
    setLoading: false,
  });
  const [internalValue, setInternalValue] = useStateWithHistory({
    values: [] as any[],
  });
  const [data, setData] = useStateWithHistory({
    values: [] as any[],
  });
  const [firstFetch, setFirstFetch] = useStateWithHistory({
    values: [] as any[],
  });
  const [finishedRender, setFinishedRender] = useState(false);
  const [tempSearch, setTempSearch] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [pagination, setPagination] = useStateWithHistory({
    page: 1,
    pageSize: props.pageSize,
    asc: true,
    sortBy: props.filterBy,
    search: '',
  } as IPagination);
  //const styles = S.useMultiSelectDropdownStyles();
  const displayBy = props.displayBy ?? props.filterBy;

  useEffect(() => {
    if (!props.value || props.value.length === 0) return setInternalValue({values: []});
    props.value &&
      setInternalValue({
        values: props.value.map((item: any) => {
          return {value: item, label: item[displayBy]};
        }),
      });
  }, [props.value]);

  useEffect(() => {
    updateData(pagination, [], true);
    setFinishedRender(true);
  }, []);

  useEffect(() => {
    if (pagination.page === 1) return;
    if (finishedRender) callUpdateData(pagination, data.values);
  }, [pagination.page]);

  useEffect(() => {
    if (finishedRender && tempSearch === '') {
      setPagination({page: 1});
      setData({values: firstFetch.values});
    }
    if (tempSearch.length > 0 && tempSearch.length < 3) return;
    if (finishedRender) {
      handleInputChange({...pagination, search: tempSearch, page: 1}, []);
    }
  }, [tempSearch]);

  async function updateData(newPagination: IPagination, previousData: any[], firstFetch?: boolean) {
    const additionalData = await getData.fetch({dynamicParams: newPagination});
    setPageCount(additionalData.pageCount);
    setData({values: [...previousData, ...additionalData.values]});
    firstFetch && setFirstFetch({values: additionalData.values});
  }

  const callUpdateData = useCallback(
    debounce((newPagination: IPagination, previousData: any[]) => {
      updateData(newPagination, previousData);
    }, delay),
    [],
  );

  const handleInputChange = useCallback(
    (newPagination: IPagination, previousData: any[]) => {
      setPagination(newPagination);
      callUpdateData(newPagination, previousData);
    },
    [callUpdateData],
  );

  function handleOptions() {
    if (tempSearch.length > 0 && tempSearch.length < 3) return [];
    const filtered = data.values.filter((item: any) => {
      let shouldAdd = true;
      internalValue.values.filter((element: any) => {
        if (element.value[props.filterBy] === item[props.filterBy]) shouldAdd = false;
      });
      if (shouldAdd) return item;
    });

    return filtered.map((item: any) => {
      return {
        value: item,
        label: item[displayBy],
      };
    });
  }

  function handleOnChange(change: any) {
    setInternalValue({values: change});
    props.onChange(change.map((item: any) => item.value));
  }

  const customFilter = useCallback(() => {
    return true;
  }, []);

  return (
    <S.SelectContainer>
      {/* <Select
        components={animatedComponents}
        placeholder={props.placeHolder}
        onChange={(item) => {
          handleOnChange(item);
        }}
        options={handleOptions()}
        value={internalValue.values}
        isMulti
        isClearable={true}
        isSearchable={true}
        closeMenuOnSelect={false}
        styles={styles.generateStyles()}
        classNamePrefix="react-select"
        isDisabled={props.readonly}
        onMenuScrollToBottom={() => {
          if (pagination.page !== pageCount) {
            setPagination({page: pagination.page + 1});
          }
        }}
        onInputChange={(value) => setTempSearch(value)}
        filterOption={customFilter}
        onBlur={() => setTempSearch('')}
      /> */}
    </S.SelectContainer>
  );
}
