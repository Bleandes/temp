import {FormField} from '#components/form-field';
import {FormRow} from '#components/form-field/styles';
import {FormFieldTypes} from '#components/form-field/types';
import {onlyNumbers} from '#helper/regex';
import {useTranslate} from '#hooks/use-translate';
import {TabsProps} from '../types';

export function TabGeral(props: TabsProps) {
  const {translate} = useTranslate();

  return (
    <>
      <FormRow marginTop="10px">
        <FormField
          name={'global.description'}
          value={props.formInfos.descricao}
          fieldType={FormFieldTypes.textInput}
          width="40%"
          maxSize={50}
          readonly
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'grupo.comissao'}
          value={props.formInfos.comissao}
          fieldType={FormFieldTypes.textInput}
          width="20%"
          textInputType="number"
          maxSize={15}
          readonly
        />
        <FormField
          name={'grupo.percentualDesconto'}
          value={props.formInfos.percentualDesconto}
          fieldType={FormFieldTypes.textInput}
          width="19%"
          readonly
          textInputType="number"
          maxSize={15}
        />
        <FormField
          name={'grupo.descontoMaximo'}
          value={props.formInfos.descontoMaximo}
          readonly
          fieldType={FormFieldTypes.textInput}
          textInputType="number"
          width="19%"
          mask={onlyNumbers}
          maxSize={10}
        />
        <FormField
          name={'grupo.fatorReferenciaGrupo'}
          value={props.formInfos.fatorReferenciaGrupo}
          fieldType={FormFieldTypes.textInput}
          readonly
          textInputType="number"
          width="19%"
          maxSize={13}
          mask={onlyNumbers}
        />
      </FormRow>
      <FormRow gapSize="1%">
        <FormField
          name={'grupo.ativaPesagemGrupo'}
          value={props.formInfos.ativaPesagemGrupo}
          fieldType={FormFieldTypes.switch}
          width={'19%'}
          readonly
          border={false}
        />
        <FormField
          name={'grupo.ativaControleDeLotesAcabados'}
          value={props.formInfos.ativaControleDeLotesAcabados}
          fieldType={FormFieldTypes.switch}
          width={'23%'}
          readonly
          border={false}
        />
        <FormField
          name={'grupo.ativaControleLotesDrogaria'}
          value={props.formInfos.ativaControleLotesDrogaria}
          fieldType={FormFieldTypes.switch}
          width={'23%'}
          readonly
          border={false}
        />
      </FormRow>
      <FormField
        name={'global.type'}
        value={props.formInfos.tipo}
        readonly
        fieldType={FormFieldTypes.radioButtons}
        options={[
          translate('global.rawMaterial'),
          translate('global.semiFinished'),
          translate('global.finished'),
          translate('global.package'),
          translate('global.capsule'),
          translate('global.drugstore'),
          translate('global.homeopathy'),
          translate('global.floral'),
        ]}
        returnIndexRadioButtons
        width="40%"
      />
      <FormField
        name={'grupo.codigoGrupoLp'}
        value={props.formInfos.codigoGrupoLp}
        fieldType={FormFieldTypes.textInput}
        width="40%"
        readonly
      />
    </>
  );
}
