import {useTranslate} from '#hooks/use-translate';
import {useEffect, useState} from 'react';
import {useFornecedorModuleApi} from '../api';
import {TabGeralProps} from '../types';
import {FormRow} from '#components/form-field/styles';
import {FormField} from '#components/form-field';
import {FormFieldTypes} from '#components/form-field/types';
import {maskCep, maskCnpj, maskCpf, maskIe, maskTelefone} from '#mask/mask';
import {maxLengthNumber} from '#helper/max-length-numbers';

export function TabGeral(props: TabGeralProps) {
  const api = useFornecedorModuleApi();
  const {translate} = useTranslate();
  const [cep, setCep] = useState<string>('');

  useEffect(() => {
    async function pesquisaCep() {
      if (cep.length == 9) {
        const response = await api.viaCep(cep.replace(/\.|-/gm, ''));

        const estado = props.formInfos.estados.filter((x: any) => x.sigla.toLowerCase() === response.uf.toLowerCase());

        const cidade = props.formInfos.cidades.filter(
          (x: any) => x.nome.toLowerCase() == response.localidade.toLowerCase(),
        );

        const bairro = props.formInfos.bairros.filter(
          (x: any) => x.nome.toLowerCase() == response.bairro.toLowerCase(),
        );

        const values = {
          endereco: response.logradouro,
          complemento: response.complemento,
          estado: estado.length > 0 ? estado[0] : {},
          cidade: cidade.length > 0 ? cidade[0] : {},
          bairro: bairro.length > 0 ? bairro[0] : {},
        };

        props.handleSetFormValue(values);
      }
    }

    pesquisaCep();
  }, [cep]);

  return (
    <>
      <FormRow gapSize="1%" marginTop="10px">
        <FormField
          name={translate('global.name')}
          value={props.handleGetFormValue('nomeFornecedor')}
          onChange={(value: any) => props.handleFormChange('nomeFornecedor', value)}
          error={props.handleGetFormErrors('nomeFornecedor')}
          fieldType={FormFieldTypes.textInput}
          width="40%"
          required={props.formType !== 'details'}
          readonly={props.formType === 'details'}
          maxSize={50}
        />
        <FormField
          name={translate('fornecedor.nomeFantasia')}
          value={props.handleGetFormValue('nomeFantasia')}
          onChange={(value: any) => props.handleFormChange('nomeFantasia', value)}
          error={props.handleGetFormErrors('nomeFantasia')}
          fieldType={FormFieldTypes.textInput}
          width="29%"
          required={props.formType !== 'details'}
          readonly={props.formType === 'details'}
          maxSize={50}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={translate('global.cpf')}
          value={props.handleGetFormValue('cpf')}
          onChange={(value: any) => props.handleFormChange('cpf', maskCpf(value))}
          error={props.handleGetFormErrors('cpf')}
          fieldType={FormFieldTypes.textInput}
          width="23%"
          required={props.formType !== 'details'}
          readonly={props.formType === 'details'}
          maxSize={14}
        />
        <FormField
          name={translate('global.cnpj')}
          value={props.handleGetFormValue('cnpj')}
          onChange={(value: any) => props.handleFormChange('cnpj', maskCnpj(value))}
          error={props.handleGetFormErrors('cnpj')}
          fieldType={FormFieldTypes.textInput}
          width="23%"
          required={props.formType !== 'details'}
          readonly={props.formType === 'details'}
          maxSize={18}
        />
        <FormField
          name={translate('fornecedor.inscricaoEstadual')}
          value={props.handleGetFormValue('inscricaoEstadual')}
          onChange={(value: any) => props.handleFormChange('inscricaoEstadual', maskIe(value))}
          error={props.handleGetFormErrors('inscricaoEstadual')}
          fieldType={FormFieldTypes.textInput}
          width="22%"
          required={props.formType !== 'details'}
          readonly={props.formType === 'details'}
          maxSize={20}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'global.cep'}
          value={props.handleGetFormValue('cep')}
          onChange={(value: any) => {
            props.handleFormChange('cep', maskCep(value)), setCep(value);
          }}
          error={props.handleGetFormErrors('cep')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="23%"
          maxSize={20}
        />
        <FormField
          name={'global.address'}
          value={props.handleGetFormValue('endereco')}
          onChange={(value: any) => props.handleFormChange('endereco', value)}
          error={props.handleGetFormErrors('endereco')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="23%"
          maxSize={50}
        />
        <FormField
          name={'global.number'}
          value={props.handleGetFormValue('numeroEndereco')}
          onChange={(value: any) => props.handleFormChange('numeroEndereco', maxLengthNumber(0, 7, value))}
          error={props.handleGetFormErrors('numeroEndereco')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="22%"
          maxSize={7}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'global.neighborhood'}
          value={props.handleGetFormValue('bairro')}
          onChange={(value: any) => props.handleFormChange('bairro', value)}
          error={props.handleGetFormErrors('bairro')}
          fieldType={FormFieldTypes.dropDown}
          readonly={props.formType === 'details'}
          width="23%"
          data={props.formInfos.bairros}
          filterDataBy={'nome'}
        />
        <FormField
          name={'global.city'}
          value={props.handleGetFormValue('cidade')}
          onChange={(value: any) => props.handleFormChange('cidade', value)}
          error={props.handleGetFormErrors('cidade')}
          fieldType={FormFieldTypes.dropDown}
          readonly={props.formType === 'details'}
          width="23%"
          data={props.formInfos.cidades}
          filterDataBy={'nome'}
        />
        <FormField
          name={'global.state'}
          value={props.handleGetFormValue('estado')}
          onChange={(value: any) => props.handleFormChange('estado', value)}
          error={props.handleGetFormErrors('estado')}
          fieldType={FormFieldTypes.dropDown}
          required={props.formType !== 'details'}
          readonly={props.formType === 'details'}
          width="22%"
          data={props.formInfos.estados}
          filterDataBy={'nome'}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'global.phone'}
          value={props.handleGetFormValue('telefone')}
          onChange={(value: any) => props.handleFormChange('telefone', maskTelefone(value))}
          error={props.handleGetFormErrors('telefone')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="19%"
          maxSize={20}
        />
        <FormField
          name={'global.celphone'}
          value={props.handleGetFormValue('celular')}
          onChange={(value: any) => props.handleFormChange('celular', maskTelefone(value))}
          error={props.handleGetFormErrors('celular')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="18%"
          maxSize={20}
        />
      </FormRow>
      <FormRow>
        <FormField
          name={'global.complement'}
          value={props.handleGetFormValue('complemento')}
          onChange={(value: any) => props.handleFormChange('complemento', value)}
          error={props.handleGetFormErrors('complemento')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="60%"
          maxSize={20}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'global.email'}
          value={props.handleGetFormValue('email')}
          onChange={(value: any) => props.handleFormChange('email', value)}
          error={props.handleGetFormErrors('email')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="30%"
          maxSize={60}
        />
        <FormField
          name={'global.website'}
          value={props.handleGetFormValue('homePage')}
          onChange={(value: any) => props.handleFormChange('homePage', value)}
          error={props.handleGetFormErrors('homePage')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="29%"
          maxSize={60}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'global.contact'}
          value={props.handleGetFormValue('contato')}
          onChange={(value: any) => props.handleFormChange('contato', value)}
          error={props.handleGetFormErrors('contato')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="30%"
          maxSize={50}
        />
        <FormField
          name={'fornecedor.telefoneContato'}
          value={props.handleGetFormValue('telefoneContato')}
          onChange={(value: any) => props.handleFormChange('telefoneContato', maskTelefone(value))}
          error={props.handleGetFormErrors('telefoneContato')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="29%"
          maxSize={20}
        />
      </FormRow>
      <FormRow>
        <FormField
          name={translate('fornecedor.indicadorDeDestino')}
          value={props.handleGetFormValue('contribuinte')}
          onChange={(value: any) => props.handleFormChange('contribuinte', value)}
          error={props.handleGetFormErrors('contribuinte')}
          fieldType={FormFieldTypes.radioButtons}
          readonly={props.formType === 'details'}
          options={[
            translate('fornecedor.radioButtonOptions.contribuinteIcms'),
            translate('fornecedor.radioButtonOptions.contribuinteIsento'),
            translate('fornecedor.radioButtonOptions.naoContribuinte'),
          ]}
          returnIndexRadioButtons
          width="30%"
        />
      </FormRow>
    </>
  );
}
