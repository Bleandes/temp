import {DefaultTable} from '#components/tables/default-table';
import {useTranslate} from '#hooks/use-translate';
import {TabsProps} from '../types';

export function TabEnsaio(props: TabsProps) {
  const {translate} = useTranslate();

  return (
    <DefaultTable
      tableName="grupoDetails"
      data={props.formInfos.grupoEnsaios || []}
      columnDefinition={[
        {
          field: 'descricao',
          headerName: `${translate('global.description')}`,
          flex: 1,
        },
      ]}
      margin="15px 0px 0px 0px"
      viewHeight="450px"
    />
  );
}
