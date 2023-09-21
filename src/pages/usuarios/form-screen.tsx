import {useToast} from '#components/toast';
import {isEmail, isEmpty} from '#helper/form-validations';
import {useForm} from '#hooks/use-form';
import {useGlobalContext} from '#hooks/use-global-context';
import {useTranslate} from '#hooks/use-translate';
import {IGrupoUsuario} from '#pages/grupo-usuario/types';
import {useEffect, useState} from 'react';
import {useUsuarioModuleApi} from './api';
import {useGrupoUsuarioModuleApi} from '#pages/grupo-usuario/api';
import {Screen} from '#components/screen';
import {FormRow} from '#components/form-field/styles';
import {FormField} from '#components/form-field';
import {FormFieldTypes} from '#components/form-field/types';
import {Spacer} from '#components/spacer';
import {AvatarPicker, AvatarRow} from '#components/avatar-picker';
import {FormScreenProps} from '#types/global-types';
import {isEmpty as isEmptyObject} from 'ramda';
import {useNavigate} from 'react-router-dom';

const cidadeFarmaceutico = import.meta.env.VITE_CIDADE_FARMACEUTICO;
const imageType = 'data:image/png;base64,';

const validationsCreate = {
  email: [isEmpty(), isEmail()],
  senha: [isEmpty()],
  confirmarSenha: [isEmpty()],
  nomeAbreviado: [isEmpty()],
};
const validationsEdit = {
  nomeAbreviado: [isEmpty()],
};

export function UsuarioFormScreen(props: FormScreenProps) {
  const context = useGlobalContext();
  const navigate = useNavigate();
  const sessionInfo = context.getSessionInfo();
  const api = useUsuarioModuleApi();
  const apiGrupoUsuario = useGrupoUsuarioModuleApi();
  const {translate} = useTranslate();
  const toast = useToast();
  const [form, onFormChange] = useForm({validations: props.type === 'create' ? validationsCreate : validationsEdit});
  const [groups, setGroups] = useState<IGrupoUsuario[]>([]);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    async function Init() {
      const response = await apiGrupoUsuario.listarGrupoUsuario();
      setGroups(response);

      if (props.id) {
        let user: any = await api.visualizarUsuario(props.id);
        const userGrupo = response.filter((value: IGrupoUsuario) => {
          if (value.id === user.grupoUsuario) return value;
        });
        user.grupoUsuario = userGrupo.length > 0 ? userGrupo[0] : {};
        delete user.nomeGrupoUsuario;
        user.nivelUsuario = user.nivelUsuario > 0;
        form.setInitialValues(user);
        user.avatar && setAvatar(imageType + user.avatar);
      }
    }

    Init();
  }, []);

  function handleCheckChange(value: boolean) {
    form.setValues({
      nivelUsuario: value,
      grupoUsuario: value ? {} : form.getValue('grupoUsuario'),
      estabelecimentos: value ? [] : form.getValue('estabelecimentos'),
    });
  }

  async function handleSubmit() {
    if (props.type === 'create' && form.getValue('senha') !== form.getValue('confirmarSenha')) {
      return toast.showErrorToast(translate('usuarios.create.mismatchPassword'));
    }

    const isAdmin = form.getValue<boolean>('nivelUsuario');

    if (!isAdmin) {
      if (form.getValue('grupoUsuario') === undefined || isEmptyObject(form.getValue('grupoUsuario'))) {
        return toast.showErrorToast(translate('usuarios.errors.noGroup'));
      }
    }

    let body = {...form.values};
    if (isEmptyObject(body.grupoUsuario)) {
      delete body.grupoUsuario;
    } else {
      body.nomeGrupoUsuario = body.grupoUsuario.nome;
      body.grupoUsuario = body.grupoUsuario.id;
    }
    delete body.confirmarSenha;
    body.nivelUsuario = isAdmin ? 1 : 0;

    switch (props.type) {
      case 'edit': {
        if (form.touched.length === 0) {
          toast.showErrorToast('global.errors.noEdit');
          return;
        }

        await api.editarUsuario(body, () => {
          navigate(-1);
          toast.showSuccessToast('global.success.edit');
        });
        break;
      }
      case 'create': {
        await api.adicionarUsuario(body, () => {
          toast.showSuccessToast('global.success.register');
          form.clear();
          setAvatar('');
        });
        break;
      }
    }
  }

  function handleAvatarChange(newAvatar: string) {
    setAvatar(newAvatar);
    onFormChange('avatar')(newAvatar.replace(imageType, ''));
  }

  return (
    <Screen
      title={props.title ?? ''}
      formButtons={props.type !== 'details'}
      onSave={() => form.trySave(handleSubmit)}
      backButton
    >
      <AvatarRow>
        <AvatarPicker value={avatar} onChange={handleAvatarChange} />
      </AvatarRow>

      <FormRow gapSize={'1%'} justifyContent={'center'} marginTop={'10px'}>
        <FormField
          name="global.name"
          fieldType={FormFieldTypes.textInput}
          onChange={onFormChange('nomeAbreviado')}
          value={form.getValue('nomeAbreviado')}
          error={form.getError('nomeAbreviado')}
          required={props.type !== 'details'}
          readonly={props.type === 'details'}
          autoFocus={props.type === 'details'}
          width={'45%'}
          maxSize={20}
        />

        <FormField
          name="global.email"
          fieldType={FormFieldTypes.textInput}
          onChange={onFormChange('email')}
          value={form.getValue('email')}
          error={form.getError('email')}
          required={props.type !== 'details'}
          readonly={props.type !== 'create'}
          width={'45%'}
          maxSize={60}
        />
      </FormRow>

      {props.type === 'create' && (
        <FormRow gapSize={'1%'} justifyContent={'center'}>
          <FormField
            name="global.password"
            fieldType={FormFieldTypes.textInput}
            onChange={onFormChange('senha')}
            value={form.getValue('senha')}
            error={form.getError('senha')}
            required
            isPassword
            width={'45%'}
            maxSize={50}
          />

          <FormField
            name="global.confirmPassword"
            fieldType={FormFieldTypes.textInput}
            onChange={onFormChange('confirmarSenha')}
            value={form.getValue('confirmarSenha')}
            error={form.getError('confirmarSenha')}
            required
            isPassword
            width={'45%'}
            maxSize={50}
          />
        </FormRow>
      )}

      <FormRow justifyContent={'center'}>
        <FormField
          name={translate('usuarios.trocarSenha')}
          value={form.getValue('forcarTrocaSenha')}
          onChange={onFormChange('forcarTrocaSenha')}
          fieldType={FormFieldTypes.switch}
          readonly={props.type === 'details'}
          width={'30%'}
          border={false}
        />
      </FormRow>

      <Spacer text="global.privileges" marginTop={15} centeredText />

      <FormRow gapSize={'1%'} justifyContent={'center'} marginTop="10px">
        {sessionInfo.estabelecimentos && sessionInfo.estabelecimentos.length > 0 && (
          <FormField
            name="usuarios.filiais"
            fieldType={FormFieldTypes.multiSelectDropDown}
            onChange={onFormChange('estabelecimentos')}
            value={form.getValue('estabelecimentos')}
            error={form.getError('estabelecimentos')}
            filterDataBy="nomeFantasia"
            openDirectionTop
            data={sessionInfo.estabelecimentos ?? []}
            readonly={props.type === 'details' || form.getValue<boolean>('nivelUsuario')}
            width={'40%'}
          />
        )}

        <FormField
          name="usuarios.grupoUsuario"
          fieldType={FormFieldTypes.dropDown}
          onChange={onFormChange('grupoUsuario')}
          value={form.getValue('grupoUsuario')}
          error={form.getError('grupoUsuario')}
          filterDataBy="nome"
          data={groups}
          required={props.type !== 'details' && !form.getValue<boolean>('nivelUsuario')}
          readonly={props.type === 'details' || form.getValue<boolean>('nivelUsuario')}
          width={'20%'}
        />

        <FormField
          name={translate('global.admin')}
          value={form.getValue('nivelUsuario')}
          onChange={(value: boolean) => handleCheckChange(value)}
          error={form.getError('nivelUsuario')}
          fieldType={FormFieldTypes.switch}
          readonly={props.type === 'details'}
          width={'20%'}
          border={false}
        />

        {context.persistValues.sessionInfo?.cidade === cidadeFarmaceutico && (
          <FormField
            name="usuarios.create.farmaceutico"
            fieldType={FormFieldTypes.switch}
            onChange={onFormChange('farmaceutico')}
            value={form.getValue('farmaceutico')}
            error={form.getError('farmaceutico')}
            readonly={props.type === 'details'}
            width={'20%'}
          />
        )}
      </FormRow>
    </Screen>
  );
}
