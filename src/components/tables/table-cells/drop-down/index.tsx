import {useMemo, useState} from 'react';
import {useTheme} from 'styled-components';
import {useTranslate} from '#hooks/use-translate';
import * as S from './styles';
import {DropDownProps} from './types';

export function TableCellDropDown(props: DropDownProps) {
  const {translate} = useTranslate();
  const theme = useTheme();
  const [filterValue, setFilterValue] = useState('');

  // const filterData = useMemo(() => {
  //   if (props.data) {
  //     return props.data
  //       .filter((y) =>
  //         unidecode(y[props.filterBy].toLowerCase().toString()).includes(
  //           unidecode(filterValue.toLowerCase()),
  //         ),
  //       )
  //       .sort((a: any, b: any) => {
  //         if (a[props.filterBy].toLowerCase() < b[props.filterBy].toLowerCase()) {
  //           return -1;
  //         } else if (a[props.filterBy].toLowerCase() > b[props.filterBy].toLowerCase()) {
  //           return 1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //   }
  // }, [props.data, filterValue, props.filterBy]);

  function showValue(): string {
    if (!props.value) return '';
    if (typeof props.value[props.filterBy] === 'string' && props.value[props.filterBy] !== '')
      return props.value[props.filterBy];
    return '';
  }

  return (
    <S.Row>
      {/* <S.CustomDropDown>
        <S.ToggleDropDown
          disabled={props.readonly}
          variant="backGroudCustom"
          id="dropdown-basic"
          placeHolder={showValue() === ''}
        >
          {props.readonly && showValue() === ''
            ? ''
            : showValue() === ''
            ? translate(props.placeHolder || '')
            : showValue()}
        </S.ToggleDropDown>

        <S.CustomDropDown.Menu>
          {!props.disableFilter && (
            <S.CustomFormControlContainer
              type="text"
              placeholder={translate('components.formField.searchFor')}
              className="mb-3"
              value={filterValue}
              onChange={(e: any) => setFilterValue(e.target.value)}
            />
          )}
          {filterData?.map((item) => (
            <S.CustomDropDown.Item
              onClick={() => {
                props.onChange(item);
              }}
              key={item.id}
            >
              {item[props.filterBy]}
            </S.CustomDropDown.Item>
          ))}
        </S.CustomDropDown.Menu>
      </S.CustomDropDown> */}
    </S.Row>
  );
}
