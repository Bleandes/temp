import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as S from './styles';
import {useGlobalContext} from '#hooks/use-global-context';
import {useToast} from '#components/toast';
import {useUsuarioModuleApi} from '#pages/usuarios/api';
import {useTranslate} from '#hooks/use-translate';
import {IUsuario} from '#pages/usuarios/types';
import {AvatarPicker, AvatarRow} from '#components/avatar-picker';
import {FormRow} from '#components/form-field/styles';
import {FormField} from '#components/form-field';
import {FormFieldTypes} from '#components/form-field/types';
import {Spacer} from '#components/spacer';
import {Screen} from '#components/screen';
import {Text} from '#components/text';

const imageType = 'data:image/png;base64,';
const cidadeFarmaceutico = import.meta.env.VITE_CIDADE_FARMACEUTICO;

function Perfil() {
  const context = useGlobalContext();
  const toast = useToast();
  const api = useUsuarioModuleApi();
  const navigate = useNavigate();
  const {translate} = useTranslate();
  const [usuario, setUsuario] = useState<IUsuario>();
  const [edit, setEdit] = useState(false);
  const [touched, setTouched] = useState(false);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    async function Init() {
      const response = await api.visualizarUsuario(context.persistValues.sessionInfo?.id || '');
      setUsuario(response);
      setAvatar(response.avatar && response.avatar !== '' ? response.avatar : '');
    }

    Init();
  }, []);

  function handleEditPicture(newPicture: string) {
    setAvatar(newPicture.replace(imageType, ''));
    setTouched(true);
  }

  async function submitEdit() {
    if (!touched) return;
    await api.editarUsuario({id: usuario?.id || '', avatar: avatar}, () => {
      toast.showSuccessToast('global.success.edit');
      setTouched(false);
      setEdit(false);
      let newSessionInfo = {...context.getPersistValue('sessionInfo')};
      newSessionInfo.avatar = avatar;
      context.setPersistContext('sessionInfo', newSessionInfo);
    });
  }

  return (
    <Screen
      title="global.perfil"
      editButton
      onEdit={() => setEdit(!edit)}
      formButtons={edit}
      onCancel={() => setEdit(false)}
      onSave={submitEdit}
    >
      <AvatarRow>
        <AvatarPicker value={avatar} disabled={!edit} hideCamera={!edit} onChange={handleEditPicture} />
      </AvatarRow>

      <FormRow gapSize={'1%'} justifyContent={'center'} marginTop='15px'>
        <FormField
          name="global.name"
          fieldType={FormFieldTypes.textInput}
          value={usuario?.nomeAbreviado}
          readonly
          width={'45%'}
          maxSize={20}
        />

        <FormField
          name="global.email"
          fieldType={FormFieldTypes.textInput}
          value={usuario?.email}
          readonly
          width={'45%'}
          maxSize={60}
          autoFocus
        />
      </FormRow>

      {/* <FormRow gapSize={'1%'} justifyContent={'center'}>
        <S.EditButton onClick={() => navigate('/trocar-senha')}>
          <S.EditIcon />
          <Text>{translate('perfil.trocarSenha')}</Text>
        </S.EditButton>
      </FormRow> */}

      <Spacer text="global.privileges" marginTop={15} centeredText />

      <FormRow gapSize={'1%'} justifyContent={'center'}>
        {usuario && usuario?.nivelUsuario === 0 ? (
          <FormField
            name="usuarios.grupoUsuario"
            fieldType={FormFieldTypes.textInput}
            value={usuario?.nomeGrupoUsuario}
            filterDataBy="nome"
            readonly
            width={'20%'}
          />
        ) : (
          <FormField
            name={translate('global.admin')}
            value={usuario && usuario?.nivelUsuario > 0}
            fieldType={FormFieldTypes.switch}
            readonly
            width={'10%'}
            border={false}
          />
        )}

        {context.persistValues.sessionInfo?.cidade === cidadeFarmaceutico && (
          <FormField
            name={translate('usuarios.create.farmaceutico')}
            value={usuario && usuario?.farmaceutico}
            fieldType={FormFieldTypes.switch}
            readonly
            width={'10%'}
            border={false}
          />
        )}
      </FormRow>
    </Screen>
  );
}

export const routes = [
  {
    path: '/perfil',
    element: () => <Perfil />,
  },
];
