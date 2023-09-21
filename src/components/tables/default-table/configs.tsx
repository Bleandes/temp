import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from '@mui/material';
import {useGlobalContext} from '#hooks/use-global-context';
import {useTranslate} from '#hooks/use-translate';

export function useDefaultTableConfigs() {
  const context = useGlobalContext();
  const {translate} = useTranslate();
  const sessionInfo = context.getSessionInfo();

  function StyledSpeedDial(saveColConfig: () => void, resetColConfig: () => void) {
    const actions = [
      {
        icon: <SaveOutlinedIcon />,
        name: translate('components.table.saveLayout'),
        action: saveColConfig,
      },
      {
        icon: <HighlightOffIcon />,
        name: translate('components.table.resetLayout'),
        action: resetColConfig,
      },
    ];

    return (
      <SpeedDial
        icon={<SpeedDialIcon />}
        ariaLabel=""
        direction="right"
        sx={{
          '& .MuiFab-root': {
            width: 36,
            height: 36,
            backgroundColor: sessionInfo.configuracaoEmpresa?.cor ?? 'rgb(207, 2, 9)',
            color: 'white',
            '&:hover': {
              backgroundColor: sessionInfo.configuracaoEmpresa?.cor ?? 'rgb(207, 2, 9)',
            },
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    );
  }

  return {
    StyledSpeedDial,
  };
}
