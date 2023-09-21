import {ReactElement, useState} from 'react';
import HashLoader from 'react-spinners/HashLoader';
import {useTheme} from 'styled-components';
import {useTranslate} from '#hooks/use-translate';
import * as S from './styles';

let loaderHandler: (isLoading: boolean, message?: string) => void;

function LoaderComponent(): ReactElement | null {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const {translate} = useTranslate();
  const theme = useTheme();

  loaderHandler = (isLoading: boolean, message?: string) => {
    if (message) {
      setMessage(message);
    } else {
      setMessage(translate('components.loader.defaultMessage'));
    }
    setLoading(isLoading);
  };

  if (!loading) return null;

  return (
    <S.View>
      <HashLoader color={theme.colors.primary} loading={loading} />
      <S.Text>{message}</S.Text>
    </S.View>
  );
}

export function useLoader() {
  return {
    Component: LoaderComponent,
    show: (message?: string) => loaderHandler(true, message),
    hide: () => loaderHandler(false),
  };
}
