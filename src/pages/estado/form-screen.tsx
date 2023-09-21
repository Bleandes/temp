import {useToast} from '#components/toast';
import {isEmpty} from '#helper/form-validations';
import {useForm} from '#hooks/use-form';
import {useTranslate} from '#hooks/use-translate';
import {cloneDeep} from 'lodash';
import {useEstadoModuleApi} from './api';
import {useState, useEffect} from 'react';
import {Screen} from '#components/screen';
import {FormRow} from '#components/form-field/styles';
import {FormField} from '#components/form-field';
import {FormFieldTypes} from '#components/form-field/types';
import {maxLengthNumber} from '#helper/max-length-numbers';
import {FormScreenProps} from '#types/global-types';
import {Spacer} from '#components/spacer';
import {DefaultTable} from '#components/tables/default-table';
import {useEstadoTableConfig} from './config';
import {IAliquotaEstado, IEstado, IEstadoAliquota} from './types';
import {RowContainer} from '#components/styled-containers';
import * as S from './styles';
import {useTheme} from 'styled-components';
import {useNavigate} from 'react-router-dom';

const validations = {
  nome: [isEmpty()],
  sigla: [isEmpty()],
};

export function EstadoScreenForm(props: FormScreenProps) {
  const tableConfig = useEstadoTableConfig();
  const api = useEstadoModuleApi();
  const toast = useToast();
  const theme = useTheme();
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const [form, onFormChange] = useForm({validations});
  const [aliquotaIcmsEstadoErro, setAliquotaIcmsEstadoErro] = useState('');
  const [aliquotaFcpEstadoErro, setAliquotaFcpEstadoErro] = useState('');
  const [detailsAliquotaEstado, setDetailsAliquotaEstado] = useState([] as IEstadoAliquota[]);
  const [aliquotasEstadoModel, setAliquotasEstadoModel] = useState([] as IAliquotaEstado[]);
  const [aliquotasEstadoModelExcluir, setaliquotasEstadoModelExcluir] = useState([] as IAliquotaEstado[]);
  const [estadoDestinoId, setEstadoDestinoId] = useState('');
  const [estadoId, setEstadoId] = useState('');
  const [estados, setEstados] = useState<IEstado[]>([]);

  useEffect(() => {
    async function init() {
      const estadoResponse = await api.retornaEstadoPorId(props.id ?? '');
      form.setInitialValues(estadoResponse);
      const aliquotasResponse = await api.listaAliquotaEstadoPorIdEstado(props.id ?? '');

      if (props.type === 'details') {
        const aliquotas: IEstadoAliquota[] = [];
        aliquotasResponse.map((x: {estadoDestino: any; estadoOrigem: any; aliquotaIcms: number; id: string}) => {
          const modelData: IEstadoAliquota = {
            id: x.id,
            siglaEstadoOrigem: x.estadoOrigem.sigla,
            nomeEstadoOrigem: x.estadoOrigem.nome,
            siglaEstadoDestino: x.estadoDestino.sigla,
            nomeEstadoDestino: x.estadoDestino.nome,
            porcentagemIcms: x.aliquotaIcms,
          };

          aliquotas.push(modelData);
        });
        setDetailsAliquotaEstado(aliquotas);
      }

      if (props.type === 'edit') {
        const listaEstados = await api.listaEstado();
        setEstadoId(estadoResponse.id);
        setEstados(listaEstados);
        const listaDados: IAliquotaEstado[] = [];
        aliquotasResponse.map(
          (x: {
            id: string;
            estadoDestino: any;
            estadoDestinoId: string;
            estadoOrigemId: string;
            aliquotaIcms: number;
          }) => {
            const data = {
              id: x.id,
              estadoOrigemId: x.estadoOrigemId,
              estadoDestinoId: x.estadoDestinoId,
              estadoDestinoNome: x.estadoDestino.nome,
              estadoDestinoSigla: x.estadoDestino.sigla,
              aliquotaIcms: x.aliquotaIcms,
            };

            listaDados.push(data);
          },
        );
        setAliquotasEstadoModel(listaDados);
      }
    }

    if (props.type !== 'create') init();
  }, []);

  async function submit() {
    const body = cloneDeep(form.values);
    if (body.pais) {
      body.paisId = body.pais.id;
      delete body.pais;
    }

    switch (props.type) {
      case 'create': {
        await api.adicionarEstado(body, () => {
          form.clear();
          toast.showSuccessToast('global.success.register');
        });
        break;
      }

      case 'edit': {
        await api.editarEstado(body, () => {
          if (aliquotasEstadoModel.length > 0) {
            aliquotasEstadoModel.map(async (item) => {
              if (item.id === '') {
                const data = {
                  id: item.id,
                  estadoOrigemId: item.estadoOrigemId,
                  estadoDestinoId: item.estadoDestinoId,
                  aliquotaIcms: item.aliquotaIcms,
                };
                await api.adicionarAliquotaEstado(data);
              } else {
                const data = {
                  id: item.id,
                  estadoOrigemId: item.estadoOrigemId,
                  estadoDestinoId: item.estadoDestinoId,
                  aliquotaIcms: item.aliquotaIcms,
                };
                await api.editarAliquotaEstado(data);
              }
            });
          }

          if (aliquotasEstadoModelExcluir.length > 0) {
            aliquotasEstadoModelExcluir.map(async (item) => {
              await api.excluirAliquotaEstado(item.id);
            });
          }

          navigate('/estado');
          toast.showSuccessToast('global.success.edit');
        });
        break;
      }
    }
  }

  function validAliquota(valor: number, index: number) {
    if (valor > 2 || valor < 0) {
      index == 0
        ? setAliquotaIcmsEstadoErro(translate('estado.erroAliquotaEstado'))
        : setAliquotaFcpEstadoErro(translate('estado.erroAliquotaEstado'));
      return;
    }

    setAliquotaFcpEstadoErro('');
    setAliquotaIcmsEstadoErro('');
    return valor;
  }

  useEffect(() => {
    if (estadoDestinoId !== '') {
      estados.map((item) => {
        if (item.id == estadoDestinoId) {
          var aliquotasEstadoFiltrarExistente = aliquotasEstadoModel.filter(
            (x) => x.estadoDestinoId == estadoDestinoId,
          );
          if (aliquotasEstadoFiltrarExistente.length == 0) {
            aliquotasEstadoModel.push({
              id: '',
              estadoOrigemId: estadoId,
              estadoDestinoId: item.id,
              estadoDestinoNome: item.nome,
              estadoDestinoSigla: item.sigla,
              aliquotaIcms: 0,
            });
            setAliquotasEstadoModel([...aliquotasEstadoModel]);
          }
        }
      });
    }
  }, [estadoDestinoId]);

  function excluirAliquotaEstado(index: number, item: any) {
    aliquotasEstadoModel.splice(index, 1);
    setAliquotasEstadoModel([...aliquotasEstadoModel]);
    aliquotasEstadoModelExcluir.push(item);
    setaliquotasEstadoModelExcluir([...aliquotasEstadoModelExcluir]);
  }

  function adicionarAliquotaEstado(aliquota: number, index: number) {
    aliquotasEstadoModel[index].aliquotaIcms = aliquota;
    setAliquotasEstadoModel([...aliquotasEstadoModel]);
  }

  function handleNumberChange(value: number) {
    if (value > 100) return 100;
    if (value < 0) return 0;
    return value;
  }

  return (
    <Screen
      title={props.title ?? ''}
      formButtons={props.type !== 'details'}
      onSave={() => form.trySave(submit)}
      backButton
    >
      <FormRow gapSize="1%">
        <FormField
          name={translate('global.name')}
          value={form.getValue('nome')}
          onChange={onFormChange('nome')}
          error={form.getError('nome')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          required={props.type !== 'details'}
          width="30%"
          maxSize={50}
          autoFocus
        />
        <FormField
          name={translate('global.acronym')}
          value={form.getValue('sigla')}
          onChange={onFormChange('sigla')}
          error={form.getError('sigla')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          required={props.type !== 'details'}
          maxSize={2}
          width="19%"
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={translate('estado.icmsAliquot')}
          value={form.getValue('aliquotaIcmsEstado')}
          onChange={(value) => onFormChange('aliquotaIcmsEstado')(validAliquota(maxLengthNumber(2, 1, value), 0))}
          error={aliquotaIcmsEstadoErro}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="16%"
          maxSize={4}
          textInputType="number"
        />
        <FormField
          name={translate('estado.fcpAliquot')}
          value={form.getValue('aliquotaFcpEstado')}
          onChange={(value) => onFormChange('aliquotaFcpEstado')(validAliquota(maxLengthNumber(2, 1, value), 1))}
          error={aliquotaFcpEstadoErro}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="16%"
          maxSize={4}
          textInputType="number"
        />
        <FormField
          name={translate('global.country')}
          value={form.getValue('pais')}
          onChange={onFormChange('pais')}
          error={form.getError('pais')}
          fieldType={FormFieldTypes.autoFetchDropDown}
          readonly={props.type === 'details'}
          route="/ListaPaginacaoPais"
          width="16%"
          filterDataBy={'nome'}
        />
      </FormRow>
      <FormRow>
        <FormField
          name={translate('estado.exemptTaxpayer')}
          value={form.getValue('checagemContribuinteIsento')}
          onChange={onFormChange('checagemContribuinteIsento')}
          error={form.getError('checagemContribuinteIsento')}
          fieldType={FormFieldTypes.switch}
          readonly={props.type === 'details'}
          width="50%"
        />
      </FormRow>
      <FormRow gapSize="2%">
        <FormField
          name={translate('estado.difalInside')}
          value={form.getValue('difalComCalculoPorDentro')}
          onChange={onFormChange('difalComCalculoPorDentro')}
          error={form.getError('difalComCalculoPorDentro')}
          fieldType={FormFieldTypes.switch}
          readonly={props.type === 'details'}
          width="24%"
        />
        <FormField
          name={translate('estado.difalExempt')}
          value={form.getValue('difalComCalculoDeIsento')}
          onChange={onFormChange('difalComCalculoDeIsento')}
          error={form.getError('difalComCalculoDeIsento')}
          fieldType={FormFieldTypes.switch}
          readonly={props.type === 'details'}
          width="24%"
        />
      </FormRow>

      <Spacer text={translate('estado.fieldSetLegend')} marginTop={20} marginBottom={20} />

      {props.type === 'details' && (
        <DefaultTable
          tableName="estadoDetails"
          columnDefinition={tableConfig.generateDetailsConfig()}
          data={detailsAliquotaEstado}
          viewHeight="300px"
        />
      )}

      {props.type === 'edit' && (
        <>
          <FormField
            name={'global.neighborhood'}
            value={{}}
            onChange={(value: any) => setEstadoDestinoId(value.id)}
            fieldType={FormFieldTypes.dropDown}
            width="30%"
            data={estados}
            filterDataBy={'nome'}
          />
          {aliquotasEstadoModel.length > 0 &&
            aliquotasEstadoModel.map((item, index) => (
              <RowContainer key={index} gapSize="1%">
                <FormField
                  name={translate('global.acronym')}
                  value={item.estadoDestinoSigla}
                  fieldType={FormFieldTypes.textInput}
                  width="20%"
                  readonly
                />
                <FormField
                  name={translate('estado.aliquotaEstado.estadoDestino')}
                  value={item.estadoDestinoNome}
                  fieldType={FormFieldTypes.textInput}
                  width="20%"
                  readonly
                />
                <FormField
                  name={translate('estado.aliquotaEstado.porcentagemIcms')}
                  value={item.aliquotaIcms}
                  onChange={(value: any) => adicionarAliquotaEstado(handleNumberChange(value), index)}
                  fieldType={FormFieldTypes.textInput}
                  textInputType="number"
                  placeHolder="0"
                  width="20%"
                />
                <S.DeleteButton onClick={() => excluirAliquotaEstado(index, item)}>
                  <S.TrashIcon size={20} color={theme.colors.primary} />
                </S.DeleteButton>
              </RowContainer>
            ))}
        </>
      )}
    </Screen>
  );
}
