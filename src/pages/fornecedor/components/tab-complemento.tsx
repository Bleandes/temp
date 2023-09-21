import {FormField} from '#components/form-field';
import {FormRow} from '#components/form-field/styles';
import {FormFieldTypes} from '#components/form-field/types';
import {maxLengthNumber} from '#helper/max-length-numbers';
import {TabGeralProps} from '../types';

export function TabComplemento(props: TabGeralProps) {
  return (
    <>
      <FormRow gapSize="1%" marginTop="10px">
        <FormField
          name={'global.bank'}
          value={props.handleGetFormValue('banco')}
          onChange={(value: any) => props.handleFormChange('banco', value)}
          error={props.handleGetFormErrors('banco')}
          fieldType={FormFieldTypes.autoFetchDropDown}
          route="/ListaPaginacaoBanco"
          readonly={props.formType === 'details'}
          width="30%"
          data={props.formInfos.bancos}
          filterDataBy={'nome'}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'global.agency'}
          value={props.handleGetFormValue('agencia')}
          onChange={(value: any) => props.handleFormChange('agencia', value)}
          error={props.handleGetFormErrors('agencia')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="20%"
          maxSize={6}
        />
        <FormField
          name={'fornecedor.contaCorrenteFornecedor'}
          value={props.handleGetFormValue('contaCorrenteFornecedor')}
          onChange={(value: any) => props.handleFormChange('contaCorrenteFornecedor', value)}
          error={props.handleGetFormErrors('contaCorrenteFornecedor')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="20%"
          maxSize={15}
        />
      </FormRow>
      <FormRow>
        <FormField
          name={'fornecedor.responsavelTecnico'}
          value={props.handleGetFormValue('responsavelTecnico')}
          onChange={(value: any) => props.handleFormChange('responsavelTecnico', value)}
          error={props.handleGetFormErrors('responsavelTecnico')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="60%"
          maxSize={50}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'fornecedor.alvaraSanitario'}
          value={props.handleGetFormValue('alvaraSanitario')}
          onChange={(value: any) => props.handleFormChange('alvaraSanitario', value)}
          error={props.handleGetFormErrors('alvaraSanitario')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="30%"
          maxSize={10}
        />
        <FormField
          name={'fornecedor.autorizacaoFuncionamento'}
          value={props.handleGetFormValue('autorizacaoFuncionamento')}
          onChange={(value: any) => props.handleFormChange('autorizacaoFuncionamento', value)}
          error={props.handleGetFormErrors('autorizacaoFuncionamento')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="29%"
          maxSize={10}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'fornecedor.autorizacaoEspecial'}
          value={props.handleGetFormValue('autorizacaoEspecial')}
          onChange={(value: any) => props.handleFormChange('autorizacaoEspecial', value)}
          error={props.handleGetFormErrors('autorizacaoEspecial')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="30%"
          maxSize={10}
        />
        <FormField
          name={'fornecedor.licencaMapa'}
          value={props.handleGetFormValue('licencaMapa')}
          onChange={(value: any) => props.handleFormChange('licencaMapa', value)}
          error={props.handleGetFormErrors('licencaMapa')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="29%"
          maxSize={50}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'fornecedor.cadastroFarmacia'}
          value={props.handleGetFormValue('cadastroFarmacia')}
          onChange={(value: any) => props.handleFormChange('cadastroFarmacia', value)}
          error={props.handleGetFormErrors('cadastroFarmacia')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="30%"
          maxSize={10}
        />
        <FormField
          name={'fornecedor.planoDeContas'}
          value={props.handleGetFormValue('planoDeContas')}
          onChange={(value: any) => props.handleFormChange('planoDeContas', value)}
          error={props.handleGetFormErrors('planoDeContas')}
          fieldType={FormFieldTypes.dropDown}
          readonly={props.formType === 'details'}
          width="29%"
          data={props.formInfos.planoDeContas}
          filterDataBy={'descricao'}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'global.host'}
          value={props.handleGetFormValue('hostFornecedor')}
          onChange={(value: any) => props.handleFormChange('hostFornecedor', value)}
          error={props.handleGetFormErrors('hostFornecedor')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="30%"
          maxSize={70}
        />
        <FormField
          name={'global.user'}
          value={props.handleGetFormValue('usuarioFornecedor')}
          onChange={(value: any) => props.handleFormChange('usuarioFornecedor', value)}
          error={props.handleGetFormErrors('usuarioFornecedor')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="14%"
          maxSize={15}
        />
        <FormField
          name={'global.password'}
          value={props.handleGetFormValue('senhaFornecedor')}
          onChange={(value: any) => props.handleFormChange('senhaFornecedor', value)}
          error={props.handleGetFormErrors('senhaFornecedor')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="14%"
          maxSize={15}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'fornecedor.valorMinimoPedido'}
          value={props.handleGetFormValue('valorMinimoPedido')}
          onChange={(value: any) => props.handleFormChange('valorMinimoPedido', value)}
          error={props.handleGetFormErrors('valorMinimoPedido')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="30%"
          maxSize={15}
        />
        <FormField
          name={'fornecedor.formaPagamento'}
          value={props.handleGetFormValue('formaPagamento')}
          onChange={(value: any) => props.handleFormChange('formaPagamento', value)}
          error={props.handleGetFormErrors('formaPagamento')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="29%"
          maxSize={100}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'fornecedor.previsaoEntrega'}
          value={props.handleGetFormValue('previsaoEntrega')}
          onChange={(value: any) => props.handleFormChange('previsaoEntrega', maxLengthNumber(0, 3, value))}
          error={props.handleGetFormErrors('previsaoEntrega')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="30%"
          maxSize={3}
        />
        <FormField
          name={'global.freight'}
          value={props.handleGetFormValue('frete')}
          onChange={(value: any) => props.handleFormChange('frete', value)}
          error={props.handleGetFormErrors('frete')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="29%"
          maxSize={100}
        />
      </FormRow>
      <FormRow>
        <FormField
          name={'global.observations'}
          value={props.handleGetFormValue('observacoes')}
          onChange={(value: any) => props.handleFormChange('observacoes', value)}
          error={props.handleGetFormErrors('observacoes')}
          fieldType={FormFieldTypes.textInput}
          readonly={props.formType === 'details'}
          width="60%"
          maxSize={100}
        />
      </FormRow>
    </>
  );
}
