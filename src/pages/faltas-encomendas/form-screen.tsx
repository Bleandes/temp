import {isEmpty} from '#helper/form-validations';
import {useForm} from '#hooks/use-form';
import {useEffect, useState} from 'react';
import {useFaltasEncomendasTableConfig} from './config';
import {useToast} from '#components/toast';
import {useTranslate} from '#hooks/use-translate';
import {useFaltasEncomendasApi} from './api';
import {IFaltasEncomendas} from './types';
import {ICliente} from '#pages/cliente/types';
import {IVendedor} from '#pages/vendedor/types';
import {cleanFormatDecimal, formatInfinityDecimal} from '#helper/formatters';
import {Screen} from '#components/screen';
import {FormRow} from '#components/form-field/styles';
import {FormField} from '#components/form-field';
import {FormFieldTypes} from '#components/form-field/types';
import {Spacer} from '#components/spacer';
import {DefaultTable} from '#components/tables/default-table';
import {maskTelefone} from '#mask/mask';
import {onlyNumbers} from '#helper/regex';
import {FormScreenProps} from '#types/global-types';
import {useNavigate} from 'react-router';

const validations = {
  vendedor: [isEmpty()],
};

const initialValues = {
  tipo: 0,
};

export function FaltasEncomendasFormScreen(props: FormScreenProps) {
  const {translate} = useTranslate();
  const navigate = useNavigate();
  const api = useFaltasEncomendasApi();
  const toast = useToast();
  const config = useFaltasEncomendasTableConfig();
  const [form, onFormChange] = useForm({validations, initialValues});
  const [faltasEncomendasModel, setFaltasEncomendasModel] = useState([] as Partial<IFaltasEncomendas>[]);
  const [faltasEncomendasCount, setFaltasEncomendasCount] = useState(0);

  useEffect(() => {
    async function init() {
      if (props.type === 'create') return;
      const faltasEncomendasResponse = await api.retornaFaltasEncomendasPorId(props.id ?? '');
      form.setInitialValues(faltasEncomendasResponse);
      switch (props.type) {
        case 'details': {
          form.setInitialValues(faltasEncomendasResponse);
          break;
        }
        case 'edit': {
          let faltasEncomendasView = [] as Partial<IFaltasEncomendas>[];
          faltasEncomendasView.push({
            id: faltasEncomendasCount + 1,
            clienteId: faltasEncomendasResponse.clienteId,
            grupoId: faltasEncomendasResponse.grupoId,
            produtoId: faltasEncomendasResponse.produtoId,
            vendedorId: faltasEncomendasResponse.vendedorId,
            observacao: faltasEncomendasResponse.observacao,
            previsaoDeEntrega: faltasEncomendasResponse.previsaoDeEntrega,
            quantidade: faltasEncomendasResponse.quantidade,
            status: faltasEncomendasResponse.status,
            telefone: faltasEncomendasResponse.telefone,
            tipo: faltasEncomendasResponse.tipo,
            descricaoProduto: faltasEncomendasResponse.produto.descricao,
            nomeGrupo: faltasEncomendasResponse.grupo.descricao,
            unidadeEstoque: faltasEncomendasResponse.produto.unidadeEstoque.descricao,
          });

          setFaltasEncomendasCount(faltasEncomendasCount + 1);
          setFaltasEncomendasModel(faltasEncomendasView);
          break;
        }
      }
    }

    init();
  }, []);

  function deleteItem(value: Partial<IFaltasEncomendas>) {
    let lista = faltasEncomendasModel.filter((item: Partial<IFaltasEncomendas>) => item.produtoId != value.produtoId);
    setFaltasEncomendasModel(lista);
  }

  function adicionarProduto(value: any) {
    let newList: Partial<IFaltasEncomendas>[] = [];
    let existValid = faltasEncomendasModel.filter((item: any) => item.produtoId === value.id);

    if (existValid.length > 0) {
      toast.showErrorToast('faltasEncomendas.erros.produtoExistente');
      return;
    }

    newList.push(...faltasEncomendasModel);

    newList.push({
      id: faltasEncomendasCount + 1,
      clienteId: form.getValue('cliente') && form.getValue('cliente').id,
      grupoId: value.grupoId,
      produtoId: value.id,
      vendedorId: form.getValue('vendedor') && form.getValue('vendedor').id,
      observacao: form.getValue('observacao'),
      previsaoDeEntrega: form.getValue('previsaoDeEntrega'),
      quantidade: 0,
      status: 0,
      telefone: form.getValue('telefone'),
      tipo: form.getValue('tipo'),
      descricaoProduto: value.descricao,
      nomeGrupo: value.grupo.descricao,
      unidadeEstoque: value.unidadeEstoque?.descricao,
    });

    setFaltasEncomendasCount(faltasEncomendasCount + 1);
    setFaltasEncomendasModel([...newList]);
  }

  async function submit() {
    if (form.getValue('tipo') === 1 && form.getValue('cliente') === null) {
      toast.showErrorToast('faltasEncomendas.erros.clienteVazio');
      return;
    }

    if (faltasEncomendasModel.length === 0) {
      toast.showErrorToast('faltasEncomendas.erros.listaProdutoVazia');
      return;
    }

    const datas: Partial<IFaltasEncomendas>[] = [];
    const cliente: ICliente = form.getValue('cliente');
    const vendedor: IVendedor = form.getValue('vendedor');
    const estabelecimentoStorage = localStorage.getItem('estabelecimento');
    const estabelecimento = JSON.parse(estabelecimentoStorage ?? '');

    faltasEncomendasModel.map((item: any) => {
      let data: Partial<IFaltasEncomendas> = {
        clienteId: cliente ? cliente.id : undefined,
        grupoId: item.grupoId,
        produtoId: item.produtoId,
        vendedorId: vendedor.id,
        observacao: form.getValue('observacao'),
        previsaoDeEntrega: form.getValue('previsaoDeEntrega'),
        quantidade: cleanFormatDecimal(item.quantidade),
        status: form.getValue('tipo') === 0 ? 0 : 1,
        telefone: form.getValue('telefone'),
        tipo: form.getValue('tipo'),
        filialId: estabelecimento.id,
      };

      datas.push(data);
    });

    let validation: boolean = true;
    datas.forEach((item: any) => {
      if (item.quantidade <= 0) validation = false;
    });
    if (!validation) return toast.showErrorToast('faltasEncomendas.erros.quantidadeInvalida');

    switch (props.type) {
      case 'create': {
        await api.adicionarFaltasEncomendas(datas, () => {
          form.clear();
          setFaltasEncomendasModel([]);
          toast.showSuccessToast('global.success.register');
        });
        break;
      }
      case 'edit': {
        const dataRequest = {
          id: form.values.id,
          faltasEncomendas: datas,
        };

        await api.editarFaltasEncomendas(dataRequest, () => {
          navigate('/faltas-encomendas');
          toast.showSuccessToast('global.success.edit');
        });
      }
    }
  }

  function handleEditCellChange(row: any) {
    const newFaltasEncomendas = faltasEncomendasModel.map((item) => {
      if (row.id === item.id) {
        return row;
      }
      return item;
    });
    setFaltasEncomendasModel(newFaltasEncomendas);
  }

  function changeItem(newValue: Partial<IFaltasEncomendas>) {
    let newValues = faltasEncomendasModel.slice();
    newValues.forEach((element: Partial<IFaltasEncomendas>, index: number) => {
      if (element.id === newValue.id) {
        newValues[index] = newValue;
      }
    });

    setFaltasEncomendasModel(newValues);
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
          name={'global.seller'}
          value={form.getValue('vendedor')}
          onChange={onFormChange('vendedor')}
          error={form.getError('vendedor')}
          fieldType={FormFieldTypes.autoFetchDropDown}
          required={props.type !== 'details'}
          readonly={props.type === 'details'}
          filterDataBy={'nome'}
          route="/ListaPaginacaoVendedor"
          width="30%"
        />
        <FormField
          value={form.getValue('tipo')}
          onChange={onFormChange('tipo')}
          error={form.getError('tipo')}
          fieldType={FormFieldTypes.radioButtons}
          options={[
            translate('faltasEncomendas.radioButtonOptions.falta'),
            translate('faltasEncomendas.radioButtonOptions.encomenda'),
          ]}
          returnIndexRadioButtons
          readonly={props.type === 'details'}
          width="19%"
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'global.client'}
          value={form.getValue('cliente')}
          onChange={onFormChange('cliente')}
          error={form.getError('cliente')}
          fieldType={FormFieldTypes.autoFetchDropDown}
          width={'50%'}
          filterDataBy={'nome'}
          route={'/ListaCliente'}
          readonly={props.type === 'details'}
          required={props.type !== 'details' ? (form.getValue('tipo') === 0 ? false : true) : false}
        />
        <FormField
          name={'global.phone'}
          value={form.getValue('telefone')}
          onChange={(value: any) => onFormChange('telefone')(maskTelefone(value))}
          error={form.getError('telefone')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="14%"
        />
        <FormField
          name={'faltasEncomendas.previsaoDeEntrega'}
          value={form.getValue('previsaoDeEntrega')}
          onChange={onFormChange('previsaoDeEntrega')}
          error={form.getError('previsaoDeEntrega')}
          fieldType={FormFieldTypes.datePicker}
          readonly={props.type === 'details'}
          width="25%"
        />
      </FormRow>
      <FormRow>
        <FormField
          name={'global.observation'}
          value={form.getValue('observacao')}
          onChange={onFormChange('observacao')}
          error={form.getError('observacao')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.type === 'details'}
          width="100%"
          maxSize={100}
        />
      </FormRow>

      {props.type !== 'details' && (
        <>
          <Spacer text={'global.products'} marginTop={5} marginBottom={0} />

          <FormField
            name={'global.product'}
            value={''}
            onChange={(value: any) => {
              adicionarProduto(value);
            }}
            fieldType={FormFieldTypes.autoFetchDropDown}
            width={'50%'}
            filterDataBy={'descricao'}
            route={'/ListaPaginacaoProduto'}
          />

          <DefaultTable
            tableName="faltasEncomendasCreate"
            columnDefinition={config.generateCreateConfig(deleteItem, changeItem)}
            data={faltasEncomendasModel}
            margin="10px 0px 0px 0px"
            viewHeight="400px"
            editMode="row"
            onRowChange={handleEditCellChange}
          />
        </>
      )}

      {props.type === 'details' && (
        <FormRow gapSize="1%">
          {form.values.grupo && (
            <FormField
              name={translate('global.group')}
              value={form.values.grupo?.descricao}
              fieldType={FormFieldTypes.textInput}
              width="15%"
              readonly
            />
          )}
          {form.values.produto && (
            <FormField
              name={translate('global.product')}
              value={form.values.produto?.descricao}
              fieldType={FormFieldTypes.textInput}
              width="60%"
              readonly
            />
          )}
          <FormField
            name={translate('global.quantity')}
            value={formatInfinityDecimal(form.getValue('quantidade'))}
            fieldType={FormFieldTypes.textInput}
            width="11%"
            readonly
          />
          {form.values.produto && (
            <FormField
              name={translate('global.unity')}
              value={form.values.produto.unidadeEstoque?.sigla}
              fieldType={FormFieldTypes.textInput}
              width="11%"
              readonly
            />
          )}
        </FormRow>
      )}
    </Screen>
  );
}
