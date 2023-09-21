import {GridSortModel} from '@mui/x-data-grid-pro';
import {debounce} from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import {removeAccent} from '#helper/string-cleaners';
import {useApi} from '#hooks/use-api';
import {useGlobalContext} from '#hooks/use-global-context';
import {useReload} from '#hooks/use-reload';
import {useStateWithHistory} from '#hooks/use-state-with-history';
import {useWindowDimensions} from '#hooks/use-window-dimensions';
import {DefaultTable} from '../default-table';
import {AutoFetchTableProps, IPagination} from './types';

const delay = import.meta.env.VITE_AUTO_FETCH_TABLE_DELAY;
export function AutoFetchTable(props: AutoFetchTableProps) {
  const dimensions = useWindowDimensions();
  const context = useGlobalContext();
  const contextKey = 'search_' + props.route.replaceAll('/', '').replaceAll('-', '');
  const tableName = props.tableName ?? 'autoFetchTableConfig_' + props.route.replaceAll('/', '').replaceAll('-', '');
  const {reload} = useReload();
  const getData = useApi('GET', '', {
    setLoading: false,
    client: props.customApiClient,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [tempSearch, setTempSearch] = useState(context.getValue(contextKey) ?? '');
  const [data, setData] = useState(undefined);
  const [finishedRender, setFinishedRender] = useState(false);
  const userConfig = context.getUserConfig(tableName) ?? {};
  const [hasTopBar, setHasTopBar] = useState(true);
  const [pagination, setPagination] = useStateWithHistory({
    page: 1,
    pageSize: 10,
    asc: userConfig.sortModel && userConfig.sortModel.length !== 0 ? userConfig.sortModel[0].sort === 'asc' : false,
    sortBy: userConfig.sortModel && userConfig.sortModel.length !== 0 ? userConfig.sortModel[0].field : '',
    search: context.getValue(contextKey) ?? '',
  } as IPagination);

  async function updateData(newPagination: IPagination, extraParams?: any) {
    if (newPagination.search) newPagination.search = removeAccent(newPagination.search.toLowerCase());
    if (props.noPagination) {
      const response = await getData.fetch({
        dynamicRoute: props.route,
      });
      setData(response ?? []);
    } else {
      const response = await getData.fetch({
        dynamicRoute: `${props.route}`,
        dynamicParams: extraParams ? {...newPagination, ...extraParams} : newPagination,
      });
      setData(response.values ?? []);
      setTotalPages(response.pageCount ?? 0);
    }
  }

  const callUpdateData = useCallback(
    debounce((newPagination: any, extraParams?: any) => {
      updateData(newPagination, extraParams);
    }, delay),
    [],
  );

  const handleInputChange = useCallback(
    (newPagination: any) => {
      setPagination(newPagination);
      callUpdateData(newPagination);
    },
    [callUpdateData],
  );

  async function onSortModelChange(model: GridSortModel) {
    if (model.length === 0) {
      return setPagination({
        asc: true,
        sortBy: '',
        page: 1,
      });
    } else {
      return setPagination({
        sortBy: model[0].field,
        asc: model[0].sort === 'asc',
        page: 1,
      });
    }
  }

  useEffect(() => {
    updateData(pagination, props.extraParams);
    setFinishedRender(true);
  }, []);

  useEffect(() => {
    if (finishedRender) {
      updateData(pagination);
    }
  }, [reload]);

  useEffect(() => {
    if (finishedRender) {
      tempSearch.length < 3 && setTempSearch('');
      callUpdateData(pagination, props.extraParams);
    }
  }, [pagination]);

  useEffect(() => {
    if (finishedRender) {
      setData(undefined);
      callUpdateData(pagination, props.extraParams);
    }
  }, [props.extraParams]);

  useEffect(() => {
    if (tempSearch.length > 0 && tempSearch.length < 3) return;
    if (finishedRender) {
      handleInputChange({...pagination, search: tempSearch});
      context.setContext(contextKey, tempSearch);
    }
  }, [tempSearch]);

  return (
    <DefaultTable
      tableName={tableName}
      columnDefinition={props.columns}
      data={data ?? []}
      filter={tempSearch}
      page={pagination.page}
      totalPages={totalPages}
      setPage={(value: number) => handleInputChange({...pagination, page: value})}
      setFilter={setTempSearch}
      hideFilter={props.hideSearch ?? false}
      hidePagination={props.noPagination || totalPages === 0}
      onSortModelChange={onSortModelChange}
      pageSize={pagination.pageSize as number}
      onPageSizeChange={(value: number) => handleInputChange({...pagination, pageSize: value})}
      tableHeight={`${hasTopBar ? dimensions.height - 260 : dimensions.height - 220}px`}
      viewHeight={`${hasTopBar ? dimensions.height - 140 : dimensions.height - 90}px`}
      sortingMode="server"
      rowHeight={40}
      onColumnConfigReset={() => {
        return setPagination({
          asc: false,
          sortBy: '',
          page: 1,
        });
      }}
      {...props}
    />
  );
}
