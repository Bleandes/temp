export interface IGrupo {
  id: string;
  descricao: string;
  comissao: number;
  percentualDesconto: number;
  descontoMaximo: number;
  tipo: number;
  ativaPesagemGrupo: boolean;
  ativaControleDeLotesAcabados: boolean;
  fatorReferenciaGrupo: number;
  ativaControleLotesDrogaria: boolean;
  codigoGrupoLp: string;
  grupoEnsaios: IGrupoEnsaios[];
}

export interface IGrupoView {
  id: string;
  descricao: string;
  tipo: number;
}

export interface IGrupoEnsaios {
  id: string;
  descricao: string;
  grupoId: string;
  ensaioId: string;
}

export interface TabsProps {
  formInfos: any;
  handleFormChange: (key: string, value: any) => void;
  handleGetFormValue: (key: string) => void;
  handleGetFormErrors: (key: string) => void;
  handleSetFormValue: (values: any) => void;
  formType: string;
}
