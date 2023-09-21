import {debounce} from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {IPagination, ListaPaginacaoResponse} from '#components/tables/auto-fetch-table/types';
import {removeAccent} from '#helper/string-cleaners';
import {useApi} from '#hooks/use-api';
import {useStateWithHistory} from '#hooks/use-state-with-history';
import {useTranslate} from '#hooks/use-translate';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import {useSharedSx} from '../styles';
import {DropDownProps} from './types';

const delay = import.meta.env.VITE_AUTO_FETCH_DROPDOWN_DELAY;
export function AutoFetchDropDown(props: DropDownProps) {
  const {textInputSx} = useSharedSx();
  const getData = useApi<ListaPaginacaoResponse>('GET', `${props.route}`, {
    setLoading: false,
  });
  const {translate} = useTranslate();
  const theme = useTheme();
  const [data, setData] = useStateWithHistory({values: [] as any[]});
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

  useEffect(() => {
    updateData(pagination, []);
    setFinishedRender(true);
  }, []);

  useEffect(() => {
    if (finishedRender) callUpdateData(pagination, data.values);
  }, [pagination.page]);

  useEffect(() => {
    if (tempSearch === '') {
      setPagination({page: 1});
    }
    if (tempSearch.length > 0 && tempSearch.length < 3) return;
    if (finishedRender) {
      handleInputChange({...pagination, search: tempSearch, page: 1}, []);
    }
  }, [tempSearch]);

  async function updateData(newPagination: IPagination, previousData: any[]) {
    if (newPagination.search) newPagination.search = removeAccent(newPagination.search.toLowerCase());
    const additionalData = await getData.fetch({dynamicParams: newPagination});
    setPageCount(additionalData.pageCount);
    setData({values: [...previousData, ...additionalData.values]});
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

  function showValue(): string {
    if (!props.value) return '';
    if (typeof props.value[props.filterBy] === 'string' && props.value[props.filterBy] !== '')
      return props.value[props.filterBy];
    return '';
  }

  const handleScroll = (event: any) => {
    const dropdown = event.target;
    if (dropdown) {
      const {scrollTop, scrollHeight, clientHeight} = dropdown;
      if (Math.abs(scrollHeight - scrollTop - clientHeight) <= 1) {
        if (pagination.page !== pageCount) {
          setPagination({page: pagination.page + 1});
        }
      }
    }
  };

  return (
    <Tooltip title={showValue()}>
      <Autocomplete
        value={showValue()}
        options={data.values.map((element: any) => element[props.filterBy])}
        fullWidth
        disabled={props.readonly}
        onChange={(event: any, newValue: string | null) => {
          const originalItem = data.values.filter((e: any) => e[props.filterBy] === newValue);
          if (originalItem && originalItem.length > 0) {
            props.onChange(originalItem[0]);
            setTempSearch('');
          } else {
            props.onChange(undefined);
            setTempSearch('');
          }
        }}
        onInputChange={(event, newInputValue) => {
          setTempSearch(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            sx={textInputSx(props.readonly, props.required)}
            error={!!props.error && props.error !== ''}
            helperText={props.error}
          />
        )}
        sx={{
          '& .MuiSvgIcon-root': {
            color: theme.colors.greyWhiteInverter,
          },
        }}
        noOptionsText={translate('components.formField.errors.noOptions')}
        ListboxProps={{onScroll: handleScroll}}
      />
    </Tooltip>
  );
}
