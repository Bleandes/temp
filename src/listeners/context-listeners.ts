const listeners: ((newValue: any) => void)[] = [];

export function addPersistContextListener(listener: (newValue: any) => void) {
  if (listeners.indexOf(listener) !== -1) return;
  listeners.push(listener);
}

export function removePersistContextListener(listener: (newValue: any) => void) {
  const index = listeners.indexOf(listener);
  if (index !== -1) {
    listeners.splice(index, 1);
  }
}

export function notifyPersistContextListeners(newValue: any) {
  listeners.forEach((listener) => {
    listener(newValue);
  });
}
