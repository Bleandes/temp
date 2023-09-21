export const ErrorMap = {
  ERRAPI00: 'errors.api.default',
  ERRAPI01: 'errors.api.expiredSession',
  ERRAPI02: 'errors.api.login',
  ERRAPI03: 'errors.api.add',
  ERRAPI04: 'errors.api.edit',
  ERRAPI05: 'errors.api.remove',
  ERRAPI06: 'errors.api.alreadyExists',
  ERRAPI07: 'errors.api.list',
  ERRAPI08: 'errors.api.noPermission',
  ERRAPI09: 'errors.api.show',
  ERRAPI10: 'errors.api.concluirFaltasEncomendas',
  ERRAPI11: 'errors.api.file',
  ERRAPI12: 'errors.api.notRegistered',
  ERRAPI13: 'errors.api.maxNumberUser',
  ERRAPI14: 'errors.api.invalidParamsTestEmail',
  ERRAPI15: 'errors.api.testEmailFailed',
  ERRAPI16: 'errors.api.excelError',
  ERRAPI17: 'errors.api.itemNotFound',
  ERRAPI18: 'errors.api.linkExpired',
  ERRAPI19: 'errors.api.sendLinkError',
};

export function getErrorMessage(code: string) {
  if (ErrorMap[code as keyof typeof ErrorMap]) {
    return ErrorMap[code as keyof typeof ErrorMap];
  } else return undefined;
}
