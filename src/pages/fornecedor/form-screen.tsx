import {ConditionalWrapper} from '#components/conditional-wrapper';
import {Screen} from '#components/screen';
import {useTabSystem} from '#components/tabs';
import {useToast} from '#components/toast';
import {isCnpjValid, isCpfValid, isEmpty} from '#helper/form-validations';
import {useForm} from '#hooks/use-form';
import {useStateWithHistory} from '#hooks/use-state-with-history';
import {useTranslate} from '#hooks/use-translate';
import {useBairroModuleApi} from '#pages/bairro/api';
import {IBairro} from '#pages/bairro/types';
import {useCidadeModuleApi} from '#pages/cidade/api';
import {ICidade} from '#pages/cidade/types';
import {TabGeral} from './components/tab-geral';
import {useEstadoModuleApi} from '#pages/estado/api';
import {IEstado} from '#pages/estado/types';
import {FormScreenProps} from '#types/global-types';
import {useFornecedorModuleApi} from './api';
import {useEffect} from 'react';
import {TabComplemento} from './components/tab-complemento';
import {usePlanoDeContasModuleApi} from '#pages/plano-de-contas/api';
import {validIeDigitos} from '#helper/valid-id-digits';
import {cloneDeep} from 'lodash';
import {useNavigate} from 'react-router';

export const validations = {
  nomeFornecedor: [isEmpty()],
  nomeFantasia: [isEmpty()],
  cnpj: [isEmpty(), isCnpjValid()],
  cpf: [isEmpty(), isCpfValid()],
  inscricaoEstadual: [isEmpty()],
};

export function FornecedorFormScreen(props: FormScreenProps) {
  const [form, setForm] = useForm({validations});
  const {translate} = useTranslate();
  const navigate = useNavigate();
  const toast = useToast();
  const Tabs = useTabSystem();
  const api = useFornecedorModuleApi();
  const bairroModule = useBairroModuleApi();
  const cidadeModule = useCidadeModuleApi();
  const estadoModule = useEstadoModuleApi();
  const planoDeContasModule = usePlanoDeContasModuleApi();
  const [formInfos, setFormInfos] = useStateWithHistory({
    bairros: [] as IBairro[],
    cidades: [] as ICidade[],
    estados: [] as IEstado[],
  });

  useEffect(() => {
    async function init() {
      async function fetchFormInfos() {
        const bairros = await bairroModule.listaBairro();
        const cidades = await cidadeModule.listaCidade();
        const estados = await estadoModule.listaEstado();
        const planoDeContas = await planoDeContasModule.listaPlanoDeContas();

        setFormInfos({
          bairros,
          cidades,
          estados,
          planoDeContas,
        });
      }
      async function setInitialForm() {
        const fornecedor = await api.retornaFornecedorPorId(props.id ?? '');
        form.setInitialValues(fornecedor);
      }

      switch (props.type) {
        case 'create': {
          await fetchFormInfos();
          break;
        }
        case 'edit': {
          await fetchFormInfos();
          await setInitialForm();
          break;
        }
        case 'details': {
          await setInitialForm();
          break;
        }
      }
    }
    init();
  }, []);

  async function submit() {
    let body = cloneDeep(form.values);

    if (form.getValue('inscricaoEstadual') !== '') {
      if (body.estado === undefined) {
        toast.showErrorToast(`${translate('fornecedor.toast.errorEstadoEmpty')}`);
        return;
      }
      if (body.estado.sigla.charAt(0).toUpperCase() != 'P') {
        if (!validIeDigitos(body.estado.sigla, form.getValue('inscricaoEstadual'))) {
          toast.showErrorToast(`${translate('fornecedor.toast.errorIe')}`);
          return;
        }
      }
    }

    if (body.bairro) {
      body.bairroId = body.bairro.id;
      delete body.bairro;
    }
    if (body.cidade) {
      body.cidadeId = body.cidade.id;
      delete body.cidade;
    }
    if (body.estado) {
      body.estadoId = body.estado.id;
      delete body.estado;
    }
    if (body.banco) {
      body.bancoId = body.banco.id;
      delete body.banco;
    }
    if (body.planoDeConta) {
      body.planoDeContaId = body.planoDeConta.id;
      delete body.planoDeConta;
    }
    if (!body.contribuinte) {
      body.contribuinte = -1;
    }

    body.cnpj = body.cnpj.replace(/[-/.]/g, '');
    body.cpf = body.cpf.replace(/\.|-/gm, '');
    body.inscricaoEstadual = body.inscricaoEstadual.replace(/\.|-/gm, '');
    body.cep = body.cep.replace(/\.|-/gm, '');

    switch (props.type) {
      case 'create': {
        await api.adicionarFornecedor(body, () => {
          toast.showSuccessToast('global.success.register');
          form.clear();
        });
        break;
      }
      case 'edit': {
        await api.editarFornecedor(body, () => {
          navigate('/fornecedor');
          toast.showSuccessToast('global.success.edit');
        });
      }
    }
  }

  function handleFormChange(key: string, value: any) {
    setForm(key)(value);
  }

  function handleGetFormValue(key: string) {
    return form.getValue(key);
  }

  function handleGetFormErrors(key: string) {
    return form.getError(key);
  }

  function handleSetFormValue(values: any) {
    return form.setValues(values);
  }

  return (
    <Screen
      title={props.title ?? ''}
      formButtons={props.type !== 'details'}
      onSave={() => form.trySave(submit)}
      backButton
    >
      <Tabs.TabManager tabConfig={['global.general', 'global.complement']} />
      <ConditionalWrapper show={Tabs.currentTab === 0}>
        <TabGeral
          formInfos={formInfos}
          handleGetFormErrors={handleGetFormErrors}
          handleGetFormValue={handleGetFormValue}
          handleFormChange={handleFormChange}
          handleSetFormValue={handleSetFormValue}
          formType={props.type}
        />
      </ConditionalWrapper>
      <ConditionalWrapper show={Tabs.currentTab === 1}>
        <TabComplemento
          formInfos={formInfos}
          handleGetFormErrors={handleGetFormErrors}
          handleGetFormValue={handleGetFormValue}
          handleFormChange={handleFormChange}
          handleSetFormValue={handleSetFormValue}
          formType={props.type}
        />
      </ConditionalWrapper>
    </Screen>
  );
}
