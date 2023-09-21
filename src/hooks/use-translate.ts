//@ts-nocheck
import {useTranslation} from 'react-i18next';

export function useTranslate() {
  const {t} = useTranslation();

  function translate(
    key: string | string[],
    params?: any,
    options?: Parameters<typeof t>[1]
  ): string {
    return t(key, {
      returnDetails: false,
      returnObjects: false,
      returnNull: false,
      ...options,
      ...params,
    });
  }

  return {translate};
}

