//@ts-nocheck

import {useTranslate} from '#hooks/use-translate';
import {FormField} from '#components/form-field';
import {FormRow} from '#components/form-field/styles';
import {FormFieldTypes} from '#components/form-field/types';
import {Screen} from '#components/screen';
import {useToast} from '#components/toast';
import {isEmpty} from '#helper/form-validations';
import {useForm} from '#hooks/use-form';
import {FormScreenProps} from '#types/global-types';
import {useNavigate} from 'react-router';
import {useUnidadeModuleApi} from './api';
import {useEffect, useState} from 'react';
import {
  cleanFormatInfinityDecimal,
  formatInfinityDecimal,
  formatQuantitativeNumber,
  onlyZeros,
  removeRightZeros,
} from '#helper/formatters';
import {Spacer} from '#components/spacer';
import {IUnidade, IUnidadeConversao} from './types';
import {SwapTable} from '#components/tables/swap-table';
import {useUnidadeTableConfig} from './config';
import {onlyIntegerNumbers} from '#helper/regex';
import {cloneDeep} from 'lodash';

const validations = {
  sigla: [isEmpty()],
  descricao: [isEmpty()],
};

const initialValues = {
  tipo: 0,
  fator: '',
};

export function UnidadeFormScreen(props: FormScreenProps) {
  const api = useUnidadeModuleApi();
  const {translate} = useTranslate();
  const config = useUnidadeTableConfig();
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useForm({validations, initialValues});
  const [listaConvercoes, setListaConvercoes] = useState([] as Partial<IUnidadeConversao | IUnidade>[]);
  const [listaUnidades, setListaUnidades] = useState([] as IUnidade[]);
  const [fatorController, setFatorController] = useState(false);

  function formatFator(fator: string) {
    if (fator) {
      const split = fator.split('.');
      const decimal = split[1] && !onlyZeros(split[1]) ? `,${removeRightZeros(split[1])}` : '';
      return `${split[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')}${decimal}`;
    }
    return '';
  }

  useEffect(() => {
    if (form.values.fator && form.values.fator.length > 0) {
      setFatorController(true);
    } else {
      setFatorController(false);
    }
  }, [form.values.fator]);

  useEffect(() => {
    async function init() {
      let unidades;
      let response;
      if (props.type !== 'details') {
        unidades = await api.listaUnidade();
      }
      if (props.id) {
        response = await api.retornaUnidadePorId(props.id);
      }
      switch (props.type) {
        case 'create': {
          unidades.map((i) => (i.fator = ''));
          setListaUnidades(unidades);
          break;
        }
        case 'edit': {
          if (response.fator) {
            const split = response.fator.split('.');
            const decimal = split[1] && !onlyZeros(split[1]) ? `,${removeRightZeros(split[1])}` : '';
            response.fator = `${split[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')}${decimal}`;
          } else {
            response.fator = '';
          }

          response.tipo = response.tipo ?? 0;

          let unidadesConversoes: IUnidade[] = [] as IUnidade[];
          let unidadesList: IUnidade[] = unidades;

          response.unidadesConversoes.forEach((element: IUnidadeConversao) => {
            element.fator = formatQuantitativeNumber(element.fator);

            let unidade = unidades.find((x) => x.id === element.unidadeConversaoId);

            if (unidade) {
              unidade.fator = element.fator;
              unidadesConversoes.push(unidade);
            }
          });

          unidadesList = unidadesList.filter((unidade) => {
            return !unidadesConversoes.some((conv) => conv.id === unidade.id);
          });

          form.setInitialValues(response);
          setListaConvercoes(unidadesConversoes);
          setListaUnidades(unidadesList);
          break;
        }
        case 'details': {
          form.setInitialValues(response);
          let unidade = response?.unidadesConversoes.map((x: any) => x.unidade) ?? [];
          unidade.forEach((item, index) => {
            item.fator = formatQuantitativeNumber(formatFator(response.unidadesConversoes[index].fator));
          });
          setListaConvercoes(unidade);
          break;
        }
      }
    }

    init();
  }, []);

  async function submit() {
    let conversoes: Partial<IUnidadeConversao[]> = [] as Partial<IUnidadeConversao[]>;

    listaConvercoes.forEach((unidade: Partial<IUnidadeConversao | IUnidade>) => {
      let unidadeConversao: Partial<IUnidadeConversao> = {
        unidadeConversaoId: unidade.id,
        fator: unidade.fator ? cleanFormatInfinityDecimal(unidade.fator) : '',
      };
      conversoes.push(unidadeConversao);
    });

    const commonData: Partial<IUnidade> = {
      sigla: form.getValue('sigla'),
      descricao: form.getValue('descricao'),
      tipo: form.getValue('tipo'),
      fator: form.getValue('fator') ? form.getValue('fator').replaceAll('.', '') : undefined,
      unidadesConversoes: conversoes,
    };

    let dataEdit: Partial<IUnidade> = {
      ...commonData,
      id: props.id,
    };

    let dataCreate: Partial<IUnidade> = {
      ...commonData,
    };

    switch (props.type) {
      case 'edit': {
        await api.editarUnidade(dataEdit, () => {
          toast.showSuccessToast('global.success.edit');
          navigate(-1);
        });
        break;
      }
      case 'create': {
        await api.adicionarUnidade(dataCreate, () => {
          toast.showSuccessToast('global.success.register');
          setListaConvercoes([]);
          form.clear();
        });
        break;
      }
    }
  }

  function changeItem(value: Partial<IUnidadeConversao | IUnidade>) {
    let newValues = cloneDeep(listaConvercoes);
    newValues.forEach((unidade: Partial<IUnidadeConversao | IUnidade>) => {
      if (unidade && unidade.id === value.id) {
        unidade.fator = value.fator;
      }
    });

    setListaConvercoes(newValues);
  }

  return (
    <Screen
      title={props.title ?? ''}
      formButtons={props.type !== 'details'}
      onSave={() => form.trySave(submit)}
      backButton
    >
      <FormRow gapSize="1%" marginTop="10px">
        <FormField
          name={'global.acronym'}
          value={form.getValue('sigla')}
          error={form.getError('sigla')}
          onChange={setForm('sigla')}
          fieldType={FormFieldTypes.textInput}
          required={props.type !== 'details'}
          readonly={props.type === 'details'}
          width="20%"
          maxSize={3}
        />
        <FormField
          name={'global.description'}
          value={form.getValue('descricao')}
          error={form.getError('descricao')}
          onChange={setForm('descricao')}
          fieldType={FormFieldTypes.textInput}
          required={props.type !== 'details'}
          readonly={props.type === 'details'}
          width="40%"
          maxSize={50}
        />
        <FormField
          name={'unidade.fatorLactobacilos'}
          value={form.getValue('fator')}
          onChange={(value: string) => setForm('fator')(formatInfinityDecimal(value, 0, 18))}
          error={form.getError('fator')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="20%"
          maxSize={18}
          mask={onlyIntegerNumbers}
        />
        <FormField
          name={'global.type'}
          value={form.getValue('tipo')}
          onChange={setForm('tipo')}
          error={form.getError('tipo')}
          options={[translate('global.mass'), translate('global.volume')]}
          fieldType={FormFieldTypes.radioButtons}
          readonly={props.type === 'details'}
          returnIndexRadioButtons
          width="10%"
        />
      </FormRow>
      {!fatorController && (
        <>
          <Spacer text={'global.conversions'} marginBottom={20} />
          <SwapTable
            margin="20px 0px 20px 0px"
            leftWidth="35%"
            rigthWidth="55%"
            rightColumnDefinition={config.generateConfigRightTable((value: Partial<IUnidadeConversao | IUnidade>) =>
              changeItem(value),
            )}
            leftColumnDefinition={config.generateConfigLeftTable()}
            leftData={props.type === 'details' ? [] : listaUnidades}
            rightData={listaConvercoes}
            setLeftData={setListaUnidades}
            setRightData={setListaConvercoes}
            readonly={props.type === 'details'}
            leftTableName={'unidade.leftTableName'}
            rightTableName={'unidade.rightTableName'}
          />
        </>
      )}
    </Screen>
  );
}
