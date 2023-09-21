import {IPermissao} from '#pages/grupo-usuario/types';
import {ISessionInfo} from '#pages/login/types';

const cidadeFarmaceutico = import.meta.env.VITE_CIDADE_FARMACEUTICO;
export interface UserPermissaoProps {
  id: string;
  modulo?: string;
  categoria?: string;
  programa?: string;
  subPrograma?: string;
  farmaceutico?: boolean;
}

export function useHasPermissao() {
  function isContextOk() {
    const sessionInfo = JSON.parse(localStorage.getItem('sessionInfo') || '');
    const permissoes = JSON.parse(localStorage.getItem('permissoes') || '');
    const auth = JSON.parse(localStorage.getItem('auth') || '');
    if (!sessionInfo || !permissoes || !auth) {
      return {permissoes: undefined, sessionInfo: undefined};
    }
    return {
      permissoes: permissoes as IPermissao[],
      sessionInfo: sessionInfo as ISessionInfo,
    };
  }

  function farmaceutico(farmaceutico?: boolean) {
    const {sessionInfo} = isContextOk();
    if (!sessionInfo) return false;
    if (sessionInfo.cidade === cidadeFarmaceutico) {
      if (farmaceutico && !sessionInfo.farmaceutico) {
        return false;
      }
    }
    return true;
  }

  function hasPermissaoById(id: string, isFarmaceutico?: boolean) {
    if (!farmaceutico(isFarmaceutico)) return false;
    if (isAdmin()) return true;
    const {permissoes} = isContextOk();
    if (!permissoes) return false;

    const filter = permissoes.filter((value) => value.rota === id);
    if (filter.length !== 0) return true;
    return false;
  }

  function hasPermissao(permissao: UserPermissaoProps) {
    if (!farmaceutico(permissao.farmaceutico)) return false;
    if (isAdmin()) return true;
    const {permissoes} = isContextOk();
    if (!permissoes) return false;

    const filter = permissoes.filter(
      (value) =>
        value.modulo === permissao.modulo &&
        value.categoria === permissao.categoria &&
        value.programa === permissao.programa &&
        value.subPrograma === permissao.subPrograma,
    );
    if (filter.length !== 0) return true;
    return false;
  }

  function hasModuloPermissao(modulo: string) {
    if (isAdmin()) return true;
    const {permissoes} = isContextOk();
    if (!permissoes) return false;
    const filter = permissoes.filter((value) => value.modulo === modulo);
    if (filter.length !== 0) return true;
    return false;
  }

  function hasCategoriaPermissao(modulo: string, categoria: string) {
    if (isAdmin()) return true;
    const {permissoes} = isContextOk();
    if (!permissoes) return false;
    const filter = permissoes.filter(
      (value) => value.modulo === modulo && value.categoria === categoria,
    );
    if (filter.length !== 0) return true;
    return false;
  }

  function hasProgramaPermissao(
    modulo: string,
    categoria: string,
    programa: string,
    entrySubPrograma: string,
  ) {
    if (isAdmin()) return true;
    const {permissoes} = isContextOk();
    if (!permissoes) return false;

    const filter = permissoes.filter(
      (value) =>
        value.modulo === modulo &&
        value.categoria === categoria &&
        value.programa === programa &&
        value.subPrograma === entrySubPrograma,
    );

    if (filter.length !== 0) return true;

    return false;
  }

  function isAdmin() {
    const {sessionInfo} = isContextOk();
    if (!sessionInfo) return false;
    if (sessionInfo.nivel > 0) return true;
  }

  return {
    hasPermissao,
    hasPermissaoById,
    hasModuloPermissao,
    hasCategoriaPermissao,
    hasProgramaPermissao,
    isAdmin,
  };
}
