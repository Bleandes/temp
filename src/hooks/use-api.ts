import axios, {AxiosResponse, Method} from 'axios';
import {isNil} from 'lodash';
import {useState} from 'react';
import {useLoader} from '#components/loader';
import {useErrorModal} from '#components/modal/error-modal';
import {ErrorMap, getErrorMessage} from '#errors/errors-map';
import {useGlobalContext} from './use-global-context';
import {useTranslate} from './use-translate';
import {useNavigate} from 'react-router-dom';

const API_HOSTS = {
  base: "https://hapi-ffweb.prismafive.com.br/api",
  viaCep: import.meta.env.VITE_VIACEP,
  //base: 'https://localhost:44346/api',
} as {[key: string]: string};

export type MSApiTypes = 'base' | 'viaCep';

interface UseServiceOptions<Request = any> {
  setLoading?: boolean;
  onLoadingMessage?: string;
  onLoadingTitle?: string;
  params?: Request;
  headers?: Record<string, any>;
  errorHandler?: (err: any) => void;
  errorMessage?: string;
  errorTitle?: string;
  onSuccess?: () => void;
  client?: MSApiTypes;
}

interface DynamicOptions<Request = any> {
  dynamicParams?: Request;
  dynamicHeaders?: Record<string, any>;
  dynamicRoute?: string;
  dynamicOnSuccess?: () => void;
}

export const useApi = <Response = any, Request = any>(
  type: Method,
  route: string,
  options?: UseServiceOptions<Request>,
) => {
  const context = useGlobalContext();
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const loader = useLoader();
  const errorModal = useErrorModal();
  const [response, setResponse] = useState<AxiosResponse<Response>>();
  const [isLoading, setInternalIsLoading] = useState<boolean>(false);
  let localAuth = '';
  let localEstabelecimento = '';

  if (typeof window !== 'undefined') {
    localAuth = window.localStorage.getItem('auth') ?? '';
    localEstabelecimento = window.localStorage.getItem('estabelecimento') ?? '';
  }

  const estabelecimento = localEstabelecimento && JSON.parse(localEstabelecimento);
  const auth = localAuth && JSON.parse(localAuth);

  function getSocket(apiType: MSApiTypes) {
    if (apiType === 'base') {
      return axios.create({
        baseURL: API_HOSTS[apiType],
        headers: {
          Authorization: `Bearer ${auth}`,
          Estabelecimento: estabelecimento.id ?? undefined,
        },
      });
    } else {
      return axios.create({
        baseURL: API_HOSTS[apiType],
      });
    }
  }

  const fetchData = async (dynamicOptions?: DynamicOptions): Promise<Response> => {
    if (options?.setLoading ?? true) {
      loader.show();
      setInternalIsLoading(true);
    }

    const socket = getSocket(options?.client ?? 'base');

    const methodParams = ['get', 'delete'].includes(type.toLowerCase())
      ? {params: dynamicOptions?.dynamicParams ?? options?.params}
      : {data: dynamicOptions?.dynamicParams ?? options?.params};

    try {
      const response = await socket.request<Request, AxiosResponse<Response>>({
        method: type,
        url: dynamicOptions?.dynamicRoute ?? route,
        headers: {
          ...options?.headers,
          ...dynamicOptions?.dynamicHeaders,
        },
        ...methodParams,
      });
      setResponse(response);
      options?.onSuccess && options.onSuccess();
      dynamicOptions?.dynamicOnSuccess && dynamicOptions.dynamicOnSuccess();
      return response.data;
    } catch (err: any) {
      if (isNil(err.response)) {
        if (!API_HOSTS[options?.client ?? 'base'].includes('localhost')) {
          context.setPersistContext('auth', '');
          context.setPersistContext('permissoes', []);
          context.setPersistContext('sessionInfo', {});
          context.setPersistContext('estabelecimento', {});
          errorModal.show({message: ErrorMap.ERRAPI01});
          navigate('/login');
        }
      } else if (err.response.status === 404) {
        errorModal.show({message: ErrorMap.ERRAPI08});
      } else if (options?.errorHandler) {
        options.errorHandler(err);
      } else {
        errorModal.show({
          title: options?.errorTitle ? translate(options.errorTitle) : undefined,
          message: options?.errorMessage
            ? translate(options.errorMessage)
            : err.response.data.code
            ? translate(getErrorMessage(err.response.data.code) ?? ErrorMap.ERRAPI00)
            : undefined,
        });

        throw err;
      }
      throw err;
    } finally {
      if (options?.setLoading ?? true) {
        loader.hide();
        setInternalIsLoading(false);
      }
    }
  };

  return {
    data: response?.data,
    axiosResponse: response,
    fetch: fetchData,
    isLoading: isLoading,
  };
};
