// @ts-nocheck
import {
  GridColumnResizeParams,
  GridColumnVisibilityModel,
  GridPinnedColumns,
  GridRowModel,
  GridRowSelectionModel,
  GridSortModel,
  esES,
  ptBR,
  useGridApiRef,
} from '@mui/x-data-grid-pro';
import {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {useToast} from '#components/toast';
import {useGlobalContext} from '#hooks/use-global-context';
import {useStateWithHistory} from '#hooks/use-state-with-history';
import {useTranslate} from '#hooks/use-translate';
import {useUsuarioModuleApi} from '#pages/usuarios/api';
import {useThemeProvider} from '#theme/theme';
import {useDefaultTableConfigs} from './configs';
import {Filter} from './filter';
import {PageSize} from './page-size';
import {PaginationComponent} from './pagination';
import * as S from './styles';
import {DefaultTableProps} from './types';

export function DefaultTable({
  hideFilter = true,
  hidePagination = true,
  ...props
}: DefaultTableProps) {
  const configs = useDefaultTableConfigs();
  const tableRef = useGridApiRef();
  const usuarioApi = useUsuarioModuleApi();
  const toast = useToast();
  const {translate} = useTranslate();
  const {isDark} = useThemeProvider();
  const context = useGlobalContext();
  const theme = useTheme();
  const colDefinitions = getColDefinition();
  const [cols, setCols] = useStateWithHistory({values: colDefinitions[0]});
  const [hasWidthChanged, setHasWidthChanged] = useState(false);
  const [columnReset, setColumnReset] = useState(false);

  useEffect(() => {
    let hasChanged = false;
    let found = false;
    let newToRender: any[] = [];

    if (props.columnDefinition.length !== cols.values.length) {
      hasChanged = true;
    } else {
      cols.values.forEach((value: any) => {
        found = false;
        props.columnDefinition.forEach((element: any) => {
          if (value.field === element.field && value.headerName === element.headerName) {
            found = true;
            newToRender.push({...element, width: value.width, flex: value.flex});
          }
        });
        if (!found) hasChanged = true;
      });
    }

    if (hasChanged) {
      setCols({values: props.columnDefinition});
      tableRef.current.setPinnedColumns({
        left: [],
        right: [],
      });
    } else {
      setCols({values: newToRender});
    }
  }, [props.columnDefinition]);

  useEffect(() => {
    setCols({values: props.columnDefinition});
  }, [columnReset]);

  useEffect(() => {
    const newColDefinitions = getColDefinition();
    setCols({values: newColDefinitions[0]});
    newColDefinitions[1] && tableRef.current.setPinnedColumns(newColDefinitions[1] ?? {});
    newColDefinitions[2] && tableRef.current.setColumnVisibilityModel(newColDefinitions[2] ?? {});
    newColDefinitions[3] && tableRef.current.setSortModel(newColDefinitions[3] ?? []);
  }, [props.tableName]);

  useEffect(() => {
    const newColDefinitions = getColDefinition();
    setCols({values: newColDefinitions[0]});
    newColDefinitions[1] && tableRef.current.setPinnedColumns(newColDefinitions[1] ?? {});
    newColDefinitions[2] && tableRef.current.setColumnVisibilityModel(newColDefinitions[2] ?? {});
    newColDefinitions[3] && tableRef.current.setSortModel(newColDefinitions[3] ?? []);
  }, []);

  function handleProps() {
    if (props.className) {
      return {...props};
    }
  }

  function getLocale() {
    if (context.getPersistValue('language') === 'pt') {
      return ptBR.components.MuiDataGrid.defaultProps.localeText;
    }
    if (context.getPersistValue('language') === 'es') {
      return esES.components.MuiDataGrid.defaultProps.localeText;
    }

    return undefined;
  }

  function processRowUpdate(newRow: GridRowModel) {
    props.onRowChange && props.onRowChange(newRow);
    const updatedRow = {...newRow, isNew: false};
    return updatedRow;
  }

  function onRowSelectionModelChange(rowSelectionModel: GridRowSelectionModel) {
    props.setSelectedCheckBoxes && props.setSelectedCheckBoxes(rowSelectionModel);
  }

  function onColumnOrderChange() {
    const fieldOrder = tableRef.current.state.columns.orderedFields;
    let newCols: any[] = [];
    fieldOrder.forEach((element: string) => {
      cols.values.forEach((col: any) => {
        if (element === col.field) newCols.push(col);
      });
    });
    setCols({values: newCols});
  }

  function onColumnWidthChange(params: GridColumnResizeParams) {
    let newCols = [...cols.values];
    newCols.forEach((value, index) => {
      if (params.colDef.field === value.field) {
        newCols[index] = params.colDef;
      }
    });
    setCols({values: newCols});
    setHasWidthChanged(true);
  }

  function onPinnedColumnsChange(pinnedColumns: GridPinnedColumns) {
    tableRef.current.setPinnedColumns(pinnedColumns);
  }

  function onColumnVisibilityModelChange(model: GridColumnVisibilityModel) {
    tableRef.current.setColumnVisibilityModel(model);
  }

  async function saveColConfig() {
    if (!props.tableName) return;
    let newCols = [...cols.values];

    if (hasWidthChanged) {
      newCols.forEach((element: any) => {
        delete element.flex;
        delete element.minWidth;
        delete element.maxWidth;
        delete element.computedWidth;
        element.width = tableRef.current.state.columns.lookup[element.field].computedWidth;
      });
    } else {
      newCols.forEach((element: any) => {
        delete element.minWidth;
        delete element.maxWidth;
        delete element.computedWidth;
        if (element.flex && element.flex !== 0) {
          delete element.width;
        } else {
          delete element.flex;
          element.width = Math.round(
            tableRef.current.state.columns.lookup[element.field].computedWidth,
          );
        }
      });
    }

    const newColConfig = {
      pinnedColumns:
        tableRef.current.getPinnedColumns() &&
        Object.keys(tableRef.current.getPinnedColumns()).length !== 0
          ? tableRef.current.getPinnedColumns()
          : undefined,
      visibleColumns:
        tableRef.current.state?.columns.columnVisibilityModel &&
        Object.keys(tableRef.current.state?.columns.columnVisibilityModel).length !== 0
          ? tableRef.current.state?.columns.columnVisibilityModel
          : undefined,
      sortModel:
        tableRef.current.getSortModel() && tableRef.current.getSortModel().length !== 0
          ? tableRef.current.getSortModel()
          : undefined,
      cols: newCols,
      ...props.extraLayoutInfo,
    };
    const newConfigs = context.setUserConfig(props.tableName, newColConfig);

    await usuarioApi.editUsuario(
      {id: context.getSessionInfo().id, configs: JSON.stringify(newConfigs)},
      () => {
        toast.showSuccessToast('components.table.saveLayoutSuccess');
        setHasWidthChanged(false);
      },
    );
  }

  async function resetColConfig() {
    if (!props.tableName) return;
    const newConfigs = context.setUserConfig(props.tableName, undefined);
    await usuarioApi.editUsuario(
      {id: context.getSessionInfo().id, configs: JSON.stringify(newConfigs)},
      () => {
        toast.showSuccessToast('components.table.resetLayoutSuccess');
        tableRef.current.setPinnedColumns({});
        tableRef.current.setColumnVisibilityModel({});
        tableRef.current.setSortModel([]);
        setColumnReset(!columnReset);
        props.onColumnConfigReset && props.onColumnConfigReset();
      },
    );
  }

  function getColDefinition() {
    const savedConfig = context.getUserConfig(props.tableName || '');
    const savedCols = savedConfig ? savedConfig.cols : undefined;
    const savedPinnedCols = savedConfig ? savedConfig.pinnedColumns : undefined;
    const savedColumnModel = savedConfig ? savedConfig.visibleColumns : undefined;
    const savedSortModel = savedConfig ? savedConfig.sortModel : undefined;
    const freshCols = props.columnDefinition;
    let finalCols = savedCols ?? freshCols;

    if (savedCols) {
      freshCols.forEach((element: any) => {
        if (
          element.field === 'actions' ||
          element.valueGetter ||
          element.renderCell ||
          element.valueFormatter
        ) {
          finalCols.forEach((savedCol: any, index: number) => {
            if (savedCol.field === element.field) {
              if (element.getActions) finalCols[index].getActions = element.getActions;
              if (element.valueGetter) finalCols[index].valueGetter = element.valueGetter;
              if (element.renderCell) finalCols[index].renderCell = element.renderCell;
              if (element.valueFormatter) finalCols[index].valueFormatter = element.valueFormatter;
            }
          });
        }
      });
    }

    return [finalCols, savedPinnedCols, savedColumnModel, savedSortModel];
  }

  function onSortModelChange(model: GridSortModel) {
    tableRef.current.setSortModel(model);
    props.onSortModelChange && props.onSortModelChange(model);
  }

  return (
    <S.TableView viewHeight={props.viewHeight} margin={props.margin} viewWidth={props.viewWidth}>
      {!hideFilter && (
        <Filter
          onChange={props.setFilter ? props.setFilter : () => {}}
          value={props.filter ?? ''}
          placeHolder={translate('components.defaultTable.placeholder')}
        />
      )}

      <S.TableContainer height={props.tableHeight}>
        <S.StyledDataGrid
          apiRef={tableRef}
          columns={cols.values ?? []}
          rows={props.data ?? []}
          localeText={getLocale()}
          editMode={props.editMode}
          rowHeight={props.rowHeight ?? 52}
          hideFooter
          disableColumnFilter
          disableColumnMenu={props.disableColumnMenu}
          checkboxSelection={props.checkBoxCollum ?? false}
          autoHeight={props.autoHeight}
          sortingMode={props.sortingMode ?? 'client'}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          isRowSelectable={props.isRowSelectable}
          getRowClassName={props.getRowClassName}
          onRowClick={props.onRowClick}
          onRowSelectionModelChange={onRowSelectionModelChange}
          rowSelectionModel={props.selectedCheckBoxes}
          getDetailPanelContent={props.getDetailPanelContent}
          getDetailPanelHeight={props.getDetailPanelHeight}
          onPinnedColumnsChange={onPinnedColumnsChange}
          getRowId={props.getRowId}
          onColumnOrderChange={
            props.onColumnOrderChange ? props.onColumnOrderChange : onColumnOrderChange
          }
          onColumnWidthChange={
            props.onColumnWidthChange ? props.onColumnWidthChange : onColumnWidthChange
          }
          sx={{
            '& .MuiDataGrid-row:hover': {
              backgroundColor: isDark ? theme.colors.grey : theme.colors.lightGrey,
            },
          }}
          components={{
            NoRowsOverlay: () => <></>,
          }}
          cellBackgroundColor={props.cellBackgroundColor}
          processRowUpdate={processRowUpdate}
          onSortModelChange={onSortModelChange}
          {...handleProps()}
        />
      </S.TableContainer>

      {!hidePagination && (
        <S.PaginationRow>
          <S.PaginationWrapper>
            <PageSize
              onChange={props.onPageSizeChange ? props.onPageSizeChange : () => {}}
              pageSize={props.pageSize ?? 10}
            />
            <PaginationComponent
              page={props.page ?? 1}
              onPageChange={props.setPage ? props.setPage : () => {}}
              totalPages={props.totalPages ?? 1}
            />
          </S.PaginationWrapper>
        </S.PaginationRow>
      )}

      {props.tableName && (
        <S.SpeedDialWrapper hidePagination={hidePagination}>
          {configs.StyledSpeedDial(saveColConfig, resetColConfig)}
        </S.SpeedDialWrapper>
      )}
    </S.TableView>
  );
}
