import {useTranslate} from '#hooks/use-translate';
import {AutoFetchDropDown} from './auto-fetch-drop-down';
import {AutoFetchMultiSelectDropDown} from './auto-fetch-multi-select-drop-down';
import {CheckBox} from './check-box';
import {DatePicker} from './date-picker';
import {DropDown} from './drop-down';
import {MultiSelectDropDown} from './multi-select-drop-down';
import {RadioButton} from './radio-button';
import * as S from './styles';
import {Switch} from './switch';
import {TextArea} from './text-area';
import {TextFieldInput} from './text-field-input';
import {TextInput} from './text-input';
import {FormFieldProps, FormFieldTypes} from './types';

export function FormField(props: FormFieldProps) {
  const {translate} = useTranslate();

  function handleOnMouseClick(): void {
    if (props.fieldType === FormFieldTypes.checkbox || props.fieldType === FormFieldTypes.switch) {
      if (props.readonly) return;
      props.onChange && props.onChange(!props.value);
      return;
    }
  }

  function handleFieldType() {
    switch (props.fieldType) {
      case FormFieldTypes.textInput:
        return (
          <TextInput
            onChange={props.onChange ? props.onChange : () => {}}
            value={props.value}
            readonly={props.readonly}
            placeHolder={translate(props.placeHolder ?? '')}
            autoFocus={props.autoFocus}
            isPassword={props.isPassword}
            mask={props.mask}
            maxSize={props.maxSize}
            label={translate(props.name ?? '')}
            required={props.required}
            error={translate(props.error ?? '')}
            textInputType={props.textInputType}
          />
        );

      case FormFieldTypes.dropDown:
        return (
          <DropDown
            data={props.data ?? []}
            filterBy={props.filterDataBy ?? ''}
            onChange={props.onChange ? props.onChange : () => {}}
            value={props.value}
            readonly={props.readonly}
            placeHolder={props.placeHolder ? translate(props.placeHolder) : translate('components.formField.select')}
            label={translate(props.name ?? '')}
            required={props.required}
            error={translate(props.error ?? '')}
          />
        );

      case FormFieldTypes.radioButtons:
        return (
          <RadioButton
            onChange={props.onChange ? props.onChange : () => {}}
            value={props.value}
            options={props.options ?? ([] as string[])}
            readonly={props.readonly ?? false}
            returnIndex={props.returnIndexRadioButtons ?? false}
            label={translate(props.name ?? '')}
            required={props.required}
            error={translate(props.error ?? '')}
          />
        );

      case FormFieldTypes.checkbox:
        return (
          <CheckBox
            value={props.value}
            onMouseClick={handleOnMouseClick}
            name={translate(props.name ?? '')}
            readonly={props.readonly ?? false}
            minWidth={getTextWidth(translate(props.name ?? ''), '16px') + 180}
            error={translate(props.error ?? '')}
          />
        );

      case FormFieldTypes.autoFetchDropDown:
        return (
          <AutoFetchDropDown
            route={props.route ?? ''}
            filterBy={props.filterDataBy ?? ''}
            onChange={props.onChange ? props.onChange : () => {}}
            value={props.value}
            readonly={props.readonly}
            placeHolder={props.placeHolder ? translate(props.placeHolder) : translate('components.formField.select')}
            pageSize={props.pageSize ?? 30}
            label={translate(props.name ?? '')}
            required={props.required}
            error={translate(props.error ?? '')}
          />
        );

      case FormFieldTypes.datePicker:
        return (
          <DatePicker
            onChange={props.onChange}
            value={props.value}
            autoFocus={props.autoFocus}
            readonly={props.readonly}
            label={translate(props.name ?? '')}
            required={props.required}
            error={translate(props.error ?? '')}
          />
        );

      case FormFieldTypes.multiSelectDropDown:
        return (
          <MultiSelectDropDown
            readonly={props.readonly}
            data={props.data ?? []}
            onChange={props.onChange ? props.onChange : () => {}}
            value={props.value}
            filterBy={props.filterDataBy ?? ''}
            placeHolder={props.placeHolder ? translate(props.placeHolder) : translate('components.formField.select')}
            displayBy={props.displayDataBy}
            openDirectionTop={props.openDirectionTop}
            label={translate(props.name ?? '')}
            required={props.required}
            error={translate(props.error ?? '')}
          />
        );

      case FormFieldTypes.textArea:
        return (
          <TextArea
            onChange={props.onChange ? props.onChange : () => {}}
            value={props.value}
            autoFocus={props.autoFocus}
            maxSize={props.maxSize}
            placeHolder={props.placeHolder}
            readonly={props.readonly}
            rows={props.rowsTextArea}
          />
        );

      case FormFieldTypes.autoFetchMultiSelectDropDown:
        return (
          <AutoFetchMultiSelectDropDown
            route={props.route ?? ''}
            readonly={props.readonly}
            onChange={props.onChange ? props.onChange : () => {}}
            value={props.value}
            filterBy={props.filterDataBy ?? ''}
            placeHolder={props.placeHolder ? translate(props.placeHolder) : translate('components.formField.select')}
            displayBy={props.displayDataBy}
            pageSize={props.pageSize ?? 100}
          />
        );

      case FormFieldTypes.switch:
        return (
          <Switch
            value={props.value}
            onMouseClick={handleOnMouseClick}
            name={props.name ?? ''}
            readonly={props.readonly ?? false}
            color={props.switchColor || ''}
          />
        );

      case FormFieldTypes.textField:
        return (
          <TextFieldInput
            label={props.name}
            value={props.value}
            onChange={props.onChange ? props.onChange : () => {}}
            readonly={props.readonly}
            required={props.required}
            autoFocus={props.autoFocus}
            placeHolder={translate(props.placeHolder ?? '')}
            isPassword={props.isPassword}
            mask={props.mask}
            maxSize={props.maxSize}
          />
        );

      default:
        return <></>;
    }
  }

  function getTextWidth(text: string, font: string) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 150;

    context.font = font || getComputedStyle(document.body).font;

    return context.measureText(text).width;
  }

  return (
    <S.View
      width={props.width ?? '50%'}
      backgroundColor={props.backgroundColor}
      minHeight={props.fieldType == FormFieldTypes.checkbox ? 25 : 60}
      minWidth={props.minWidth ?? getTextWidth(props.name || '', '18px') + 130}
    >
      {handleFieldType()}
    </S.View>
  );
}
