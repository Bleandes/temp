import {FormField} from '#components/form-field';
import {FormFieldTypes} from '#components/form-field/types';
import {RowContainer} from '#components/styled-containers';
import {formatMoney} from '#helper/formatters';
import {onlyNumbers} from '#helper/regex';
import {useTranslate} from '#hooks/use-translate';
import {TabProps} from '#pages/empresa/types';

export const TabGeral = (props: TabProps) => {
  const {translate} = useTranslate();

  return (
    <>
      <RowContainer gapSize="1%">
        <FormField
          name={'empresa.razaoSocial'}
          value={props.empresaForm.razaoSocial ?? ''}
          fieldType={FormFieldTypes.textInput}
          width="33%"
          maxSize={50}
          readonly
        />
        <FormField
          name={'empresa.nomeFantasia'}
          value={props.empresaForm.nomeFantasia ?? ''}
          fieldType={FormFieldTypes.textInput}
          width="33%"
          maxSize={50}
          readonly
        />
        <FormField
          name={'empresa.regimeTributario.title'}
          value={props.empresaForm.regimeTributario ?? ''}
          onChange={(value) => props.handleFormChange('regimeTributario', value)}
          error={props.handleGetFormErrors('regimeTributario')}
          fieldType={FormFieldTypes.radioButtons}
          options={[
            translate('empresa.regimeTributario.simplesNacional'),
            translate('empresa.regimeTributario.simplesNacionalSubLimite'),
            translate('empresa.regimeTributario.regimeNormal'),
          ]}
          returnIndexRadioButtons
          width="32%"
          readonly={!props.edit}
        />
      </RowContainer>
      <RowContainer gapSize="1%">
        <FormField
          name={'global.cnpj'}
          value={props.empresaForm.cnpj ?? ''}
          onChange={(value) => props.handleFormChange('cnpj', value)}
          error={props.handleGetFormErrors('cnpj')}
          fieldType={FormFieldTypes.textInput}
          width="20%"
          maxSize={18}
          readonly
        />
        <FormField
          name={'empresa.inscricaoEstadual'}
          value={props.empresaForm.inscricaoEstadual ?? ''}
          onChange={(value) => props.handleFormChange('inscricaoEstadual', value)}
          error={props.handleGetFormErrors('inscricaoEstadual')}
          fieldType={FormFieldTypes.textInput}
          width="20%"
          maxSize={20}
          readonly={!props.edit}
        />
        <FormField
          name={'empresa.inscricaoMunicipal'}
          value={props.empresaForm.inscricaoMunicipal ?? ''}
          onChange={(value) => props.handleFormChange('inscricaoMunicipal', value)}
          error={props.handleGetFormErrors('inscricaoMunicipal')}
          fieldType={FormFieldTypes.textInput}
          width="20%"
          maxSize={20}
          readonly={!props.edit}
        />
        <FormField
          name={'empresa.markupPadrao'}
          value={formatMoney(props.empresaForm.configuracaoEmpresa?.markupPadrao)}
          onChange={(value) =>
            props.handleFormChange('configuracaoEmpresa', {
              ...props.empresaForm.configuracaoEmpresa,
              markupPadrao: formatMoney(value),
            })
          }
          error={props.handleGetFormErrors('markupPadrao')}
          fieldType={FormFieldTypes.textInput}
          width="18%"
          readonly={!props.edit}
        />
        <FormField
          name={'empresa.prazoPadrao'}
          value={props.empresaForm.configuracaoEmpresa?.prazoPadrao}
          onChange={(value) =>
            props.handleFormChange('configuracaoEmpresa', {
              ...props.empresaForm.configuracaoEmpresa,
              prazoPadrao: value,
            })
          }
          error={props.handleGetFormErrors('prazoPadrao')}
          fieldType={FormFieldTypes.textInput}
          width="18%"
          mask={onlyNumbers}
          readonly={!props.edit}
        />
      </RowContainer>
      <RowContainer gapSize="1%">
        <FormField
          name={'global.address'}
          value={props.empresaForm.logradouro ?? ''}
          onChange={(value) => props.handleFormChange('logradouro', value)}
          error={props.handleGetFormErrors('logradouro')}
          fieldType={FormFieldTypes.textInput}
          width="31%"
          maxSize={18}
          readonly={!props.edit}
        />
        <FormField
          name={'global.number'}
          value={props.empresaForm.numero ?? ''}
          onChange={(value) => props.handleFormChange('numero', value)}
          error={props.handleGetFormErrors('numero')}
          fieldType={FormFieldTypes.textInput}
          width="18%"
          maxSize={7}
          readonly={!props.edit}
        />
        <FormField
          name={'global.cep'}
          value={props.empresaForm.cep ?? ''}
          onChange={(value) => props.handleFormChange('cep', value)}
          error={props.handleGetFormErrors('cep')}
          fieldType={FormFieldTypes.textInput}
          width="18%"
          maxSize={9}
          readonly={!props.edit}
        />
        <FormField
          name={'empresa.complemento'}
          value={props.empresaForm.complemento ?? ''}
          onChange={(value) => props.handleFormChange('complemento', value)}
          error={props.handleGetFormErrors('complemento')}
          fieldType={FormFieldTypes.textInput}
          width="30%"
          readonly={!props.edit}
        />
      </RowContainer>
      <RowContainer gapSize="1%">
        <FormField
          name={'global.neighborhood'}
          value={props.empresaForm.bairro}
          onChange={(value) => props.handleFormChange('bairro', value)}
          error={props.handleGetFormErrors('bairro')}
          fieldType={FormFieldTypes.autoFetchDropDown}
          width="33%"
          filterDataBy={'nome'}
          readonly={!props.edit}
          route="/ListaPaginacaoBairro"
        />
        <FormField
          name={'global.city'}
          value={props.empresaForm.cidade}
          onChange={(value) => props.handleFormChange('cidade', value)}
          error={props.handleGetFormErrors('cidade')}
          fieldType={FormFieldTypes.autoFetchDropDown}
          width="33%"
          filterDataBy={'nome'}
          readonly={!props.edit}
          route="/ListaPaginacaoCidade"
        />
        <FormField
          name={'global.state'}
          value={props.empresaForm.estado}
          onChange={(value) => props.handleFormChange('estado', value)}
          error={props.handleGetFormErrors('estado')}
          fieldType={FormFieldTypes.autoFetchDropDown}
          width="32%"
          filterDataBy={'nome'}
          readonly={!props.edit}
          route="/ListaPaginacaoEstado"
        />
      </RowContainer>
      <RowContainer gapSize="1%">
        <FormField
          name={'global.ddd'}
          value={props.empresaForm.ddd ?? ''}
          onChange={(value) => props.handleFormChange('ddd', value)}
          error={props.handleGetFormErrors('ddd')}
          fieldType={FormFieldTypes.textInput}
          placeHolder="47"
          width="10%"
          maxSize={4}
          readonly={!props.edit}
        />
        <FormField
          name={'global.phone'}
          value={props.empresaForm.telefone ?? ''}
          onChange={(value) => props.handleFormChange('telefone', value)}
          error={props.handleGetFormErrors('telefone')}
          fieldType={FormFieldTypes.textInput}
          width="22%"
          maxSize={20}
          readonly={!props.edit}
        />
        <FormField
          name={'global.ddd'}
          value={props.empresaForm.dddCelular ?? ''}
          onChange={(value) => props.handleFormChange('dddCelular', value)}
          error={props.handleGetFormErrors('dddCelular')}
          fieldType={FormFieldTypes.textInput}
          width="10%"
          maxSize={4}
          readonly={!props.edit}
        />
        <FormField
          name={'global.celphone'}
          value={props.empresaForm.celular ?? ''}
          onChange={(value) => props.handleFormChange('celular', value)}
          error={props.handleGetFormErrors('celular')}
          fieldType={FormFieldTypes.textInput}
          width="22%"
          maxSize={20}
          readonly={!props.edit}
        />
        <FormField
          name={'global.ddd'}
          value={props.empresaForm.dddWhatsApp ?? ''}
          onChange={(value) => props.handleFormChange('dddWhatsApp', value)}
          error={props.handleGetFormErrors('dddWhatsApp')}
          fieldType={FormFieldTypes.textInput}
          width="10%"
          maxSize={4}
          readonly={!props.edit}
        />
        <FormField
          name={'global.whatsApp'}
          value={props.empresaForm.whatsApp ?? ''}
          onChange={(value) => props.handleFormChange('whatsApp', value)}
          error={props.handleGetFormErrors('whatsApp')}
          fieldType={FormFieldTypes.textInput}
          width="21%"
          maxSize={20}
          readonly={!props.edit}
        />
      </RowContainer>
      <RowContainer gapSize="1%">
        <FormField
          name={'global.email'}
          value={props.empresaForm.email ?? ''}
          onChange={(value) => props.handleFormChange('email', value)}
          error={props.handleGetFormErrors('email')}
          fieldType={FormFieldTypes.textInput}
          width="33%"
          maxSize={60}
          readonly={!props.edit}
        />
        <FormField
          name={'empresa.nomeFarmaceutico'}
          value={props.empresaForm.nomeFarmaceutico ?? ''}
          onChange={(value) => props.handleFormChange('nomeFarmaceutico', value)}
          error={props.handleGetFormErrors('nomeFarmaceutico')}
          fieldType={FormFieldTypes.textInput}
          width="33%"
          maxSize={50}
          readonly={!props.edit}
        />
        <FormField
          name={'global.crf'}
          value={props.empresaForm.crf ?? ''}
          onChange={(value) => props.handleFormChange('crf', value)}
          error={props.handleGetFormErrors('crf')}
          fieldType={FormFieldTypes.textInput}
          mask={onlyNumbers}
          width="32%"
          readonly={!props.edit}
        />
      </RowContainer>
      <RowContainer gapSize="1%">
        <FormField
          name={'empresa.cpfRespSNGPC'}
          value={props.empresaForm.cpfRespSNGPC ?? ''}
          onChange={(value) => props.handleFormChange('cpfRespSNGPC', value)}
          error={props.handleGetFormErrors('cpfRespSNGPC')}
          fieldType={FormFieldTypes.textInput}
          width="20%"
          maxSize={14}
          readonly={!props.edit}
        />
        <FormField
          name={'empresa.usuarioSNGPC'}
          value={props.empresaForm.usuarioSNGPC ?? ''}
          onChange={(value) => props.handleFormChange('usuarioSNGPC', value)}
          error={props.handleGetFormErrors('usuarioSNGPC')}
          fieldType={FormFieldTypes.textInput}
          width="37%"
          maxSize={100}
          readonly={!props.edit}
        />
        <FormField
          name={'empresa.senhaSNGPC'}
          value={props.empresaForm.senhaSNGPC ?? ''}
          onChange={(value) => props.handleFormChange('senhaSNGPC', value)}
          error={props.handleGetFormErrors('senhaSNGPC')}
          fieldType={FormFieldTypes.textInput}
          width="20%"
          isPassword
          maxSize={50}
          readonly={!props.edit}
        />
        <FormField
          name={'empresa.licencaFunc'}
          value={props.empresaForm.licencaFunc ?? ''}
          onChange={(value) => props.handleFormChange('licencaFunc', value)}
          error={props.handleGetFormErrors('licencaFunc')}
          fieldType={FormFieldTypes.textInput}
          width="20%"
          maxSize={50}
          readonly={!props.edit}
        />
      </RowContainer>
      <RowContainer gapSize="1%">
        <FormField
          name={'empresa.autoridadeSanitaria'}
          value={props.empresaForm.autoridadeSanitaria ?? ''}
          onChange={(value) => props.handleFormChange('autoridadeSanitaria', value)}
          error={props.handleGetFormErrors('autoridadeSanitaria')}
          fieldType={FormFieldTypes.textInput}
          width="50%"
          maxSize={50}
          readonly={!props.edit}
        />
        <FormField
          name={'empresa.licencaMapa'}
          value={props.empresaForm.licencaMapa ?? ''}
          onChange={(value) => props.handleFormChange('licencaMapa', value)}
          error={props.handleGetFormErrors('licencaMapa')}
          fieldType={FormFieldTypes.textInput}
          width="49%"
          maxSize={50}
          readonly={!props.edit}
        />
      </RowContainer>
    </>
  );
};
