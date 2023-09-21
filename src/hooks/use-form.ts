//@ts-nocheck
import * as R from 'ramda';
import React from 'react';
import {useStateWithHistory} from './use-state-with-history';

interface IFormProps {
  initialValues?: {
    [field: string]: any;
  };
  validations?: {
    [field: string]: [(field: any, form?: {[field: string]: any}) => any, string][];
  };
  deleteEmptyFields?: boolean;
}

export interface IForm {
  values: {
    [field: string]: any;
  };
  errors: {
    [field: string]: string;
  };
  touched: string[];
  hasErrors: boolean;

  getValue: <T = any>(field: string) => T;
  getError: (field: string) => string | undefined;

  setValues: (fields: {[field: string]: any}) => void;
  setInitialValues: (fields: {[field: string]: any}) => void;
  setErrors: (fields: {[field: string]: string}) => void;

  trySave: (callback?: (e: any) => void) => (e: any) => boolean;
  clear: (data?: any) => void;
}

export type IFormChange = (field: string) => (value: any) => void;

export const useForm = ({
  initialValues = {},
  validations = {},
  deleteEmptyFields = true,
}: IFormProps): [IForm, IFormChange] => {
  const [{values, errors, touched, triedSave}, setState] = useStateWithHistory({
    values: {},
    errors: {},
    touched: [],
    triedSave: false,
  });

  React.useEffect(() => {
    const data = initialValues || {};
    const newErrors = validateData(data);
    setState({values: data, errors: newErrors});
  }, []);

  function getValue<T = any>(name: string, data: {[field: string]: any} = values): T {
    return data[name] as T;
  }

  const validateData = (data = {}) => {
    return Object.keys(validations).reduce((acc, key) => {
      const error = R.reduceWhile(
        (acc) => !acc,
        (acc, validation: any) => (validation[0](getValue(key, data), data) ? validation[1] : acc),
        null,
        validations[key],
      );

      return {...acc, ...(error ? {[key]: error} : {})};
    }, []);
  };

  const onChange = React.useCallback(
    (name: string, remove: string[] = []) =>
      (value: any) => {
        if (deleteEmptyFields) {
          if (typeof value === 'string') {
            if (value === '') return setValues({}, [name]);
          }
          if (Array.isArray(value)) {
            if (value.length === 0) return setValues({}, [name]);
          }
          if (typeof value === 'object') {
            if (Object.keys(value).length === 0) return setValues({}, [name]);
          }
          if (value === null || value === undefined) return setValues({}, [name]);
        }
        const data = {[name]: value};
        setValues(data, remove);
      },
    [values],
  );

  const setValues = (data: {[field: string]: any}, remove: string[] = []) => {
    const newValues = {...R.omit(remove, values), ...data};
    const newErrors = {...validateData(newValues)};
    const newTouched = [...touched, ...Object.keys(data)];

    setState({
      values: newValues,
      errors: newErrors,
      touched: [...new Set(newTouched)],
    });
  };

  const setInitialValues = (data: {[field: string]: any}, remove: string[] = []) => {
    const newValues = {...R.omit(remove, values), ...data};
    const newErrors = {...validateData(newValues)};

    setState({
      values: newValues,
      errors: newErrors,
      touched: [],
    });
  };

  const setErrors = (errors: {[field: string]: string}) => {
    const newTouched = [...touched, ...Object.keys(errors)];
    setState({
      errors,
      touched: [...new Set(newTouched)],
    });
  };

  const getError = (name: string) => {
    return errors[name] && (touched.indexOf(name) !== -1 || triedSave) ? errors[name] : null;
  };

  const trySave = (callback: () => void) => {
    setState({triedSave: true, errors: {...validateData(values)}});

    if (!R.isEmpty(errors) && !R.isNil(errors)) {
      return false;
    }

    callback && callback();

    return true;
  };

  function clear(data?: any) {
    setState(() => ({
      values: data ?? initialValues,
      errors: validateData(data),
      touched: [],
      triedSave: false,
    }));
  }

  const form = {
    hasErrors: !R.isEmpty(errors) && !R.isNil(errors),
    getValue,
    getError,
    setErrors,
    setValues,
    errors,
    values,
    touched,
    trySave,
    clear,
    setInitialValues,
  };

  return [form, onChange];
};
