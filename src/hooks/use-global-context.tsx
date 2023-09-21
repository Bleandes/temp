import {notifyPersistContextListeners} from '#listeners/context-listeners';
import {PropsWithChildren, ReactElement, createContext} from 'react';
import {IContext, IPersistContext, initialContextValues, initialPersistValues} from '#context/initial-state';
import {ILayoutConfig} from '#layout/types';
import {IEstabelecimento, ISessionInfo} from '#pages/login/types';
import {useStateWithHistory} from './use-state-with-history';

const ContextComponent = createContext({
  context: initialContextValues,
  persistContext: initialPersistValues,
});

type ContextKey = keyof IContext;
type PersistContextKey = keyof IPersistContext;

let setContextInstance: (key: ContextKey | string, value: any) => void;
let setPersistContextInstance: (key: PersistContextKey, value: any) => void;
let contextValue: IContext;
let contextPersistValue: IPersistContext;
let getPersistValue: <T = any>(key: string) => T | undefined;
let getValue: (key: string) => any;
let clearContext: () => void;
let getSessionInfo: () => ISessionInfo;
let setSessionInfo: (key: keyof ISessionInfo, value: any) => void;
let getUserConfig: (key: string) => any;
let setUserConfig: (key: string, value: any) => any;
let getEstabelecimentos: () => IEstabelecimento[];
let getSelectedEstabelecimento: () => IEstabelecimento | undefined;
let getLayoutConfig: () => ILayoutConfig | undefined;
let setLayoutConfig: (key: keyof ILayoutConfig, value: any) => void;

function retrieveStorage() {
  const storedKeys = Object.entries(initialPersistValues);
  let persistedContext: any = {};
  storedKeys.forEach((k) => {
    const key = k[0];
    const keyValue = window.localStorage.getItem(key);
    const keyIntialValue = k[1];

    if (keyValue) {
      persistedContext[key] = JSON.parse(keyValue);
    } else {
      window.localStorage.setItem(key, JSON.stringify(keyIntialValue));
      persistedContext[key] = keyIntialValue;
    }
  });

  return persistedContext;
}

function GlobalContext(props: PropsWithChildren): ReactElement {
  const [localContext, setLocalContextValue] = useStateWithHistory({
    values: initialContextValues,
  });
  const [persistContext, setPersistContextValue] = useStateWithHistory(retrieveStorage());
  contextValue = localContext.values;
  contextPersistValue = persistContext;

  function getPersistValueFunction<T = any>(key: string) {
    if (!persistContext) return;
    return persistContext[key] as T;
  }

  getPersistValue = getPersistValueFunction;

  function getValueFunction(key: string) {
    return localContext.values[key];
  }
  getValue = getValueFunction;

  setContextInstance = function setContext(key: ContextKey | string, newValue: any) {
    const newState = {
      ...localContext.values,
      [key]: newValue,
    };
    setLocalContextValue({values: newState});
  };

  setPersistContextInstance = function setPersistContext(key: PersistContextKey, newValue: any) {
    setPersistContextValue({[key]: newValue});
    window.localStorage.setItem(key, JSON.stringify(newValue));
    notifyPersistContextListeners({[key]: newValue});
  };

  clearContext = function clearLocalContext() {
    setLocalContextValue({values: initialContextValues});
  };

  getSessionInfo = function getSessionInfoInstance() {
    return persistContext?.sessionInfo ?? {};
  };

  setSessionInfo = function setSessionInfoInstace(key: keyof ISessionInfo, value: any) {
    let newSessionInfo = {...persistContext.sessionInfo};
    newSessionInfo[key] = value;
    setPersistContextValue({sessionInfo: newSessionInfo});
    window.localStorage.setItem('sessionInfo', JSON.stringify(newSessionInfo));
  };

  getUserConfig = function getUserConfigInstance(key: string) {
    const sessionInfo = JSON.parse(window.localStorage.getItem('sessionInfo') || '') as ISessionInfo;
    if (sessionInfo && sessionInfo.configs) {
      return sessionInfo.configs[key];
    }
    return undefined;
  };

  setUserConfig = function setUserConfigInstance(key: string, value: any) {
    let newSessionInfo = {...persistContext.sessionInfo};
    newSessionInfo.configs = {...newSessionInfo.configs, [key]: value};
    setPersistContextValue({sessionInfo: newSessionInfo});
    window.localStorage.setItem('sessionInfo', JSON.stringify(newSessionInfo));
    return newSessionInfo.configs;
  };

  getEstabelecimentos = function getEstabelecimentosInstance() {
    return persistContext?.sessionInfo.nivel >= 1
      ? persistContext?.sessionInfo.estabelecimentos
      : persistContext?.sessionInfo.acessoEstabelecimentos;
  };

  getSelectedEstabelecimento = function getSelectedEstabelecimentoInstance() {
    if (persistContext?.estabelecimento && Object.keys(persistContext?.estabelecimento).length > 0)
      return persistContext.estabelecimento;
    return undefined;
  };

  getLayoutConfig = function getLayoutConfigInstance() {
    if (persistContext?.layoutConfig && Object.keys(persistContext?.layoutConfig).length > 0)
      return persistContext.layoutConfig;
    return undefined;
  };

  setLayoutConfig = function setLayoutConfig(key: keyof ILayoutConfig, value: any) {
    const newLayoutConfig = {
      ...persistContext.layoutConfig,
      [key]: value,
    };
    window.localStorage.setItem('layoutConfig', JSON.stringify(newLayoutConfig));
    setPersistContextValue({layoutConfig: newLayoutConfig});
  };

  return (
    <ContextComponent.Provider value={{context: localContext.values, persistContext}}>
      {props.children}
    </ContextComponent.Provider>
  );
}

export function useGlobalContext() {
  return {
    Component: GlobalContext,
    setContext: setContextInstance,
    setPersistContext: setPersistContextInstance,
    values: contextValue,
    persistValues: contextPersistValue,
    getPersistValue,
    getValue,
    clearContext,
    getSessionInfo,
    setSessionInfo,
    getUserConfig,
    setUserConfig,
    getEstabelecimentos,
    getSelectedEstabelecimento,
    getLayoutConfig,
    setLayoutConfig,
  };
}
