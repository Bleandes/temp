import {ToastContainer, toast} from 'react-toastify';
import {useTranslate} from '#hooks/use-translate';

let successToast: (message: string) => void;
let errorToast: (message: string) => void;

function Toaster() {
  const {translate} = useTranslate();

  successToast = function successToastFunction(message: string) {
    toast.success(translate(message));
  };

  errorToast = function errorToastFunction(message: string) {
    toast.error(translate(message));
  };

  return <ToastContainer position="top-center" />;
}

export function useToast() {
  return {
    Component: Toaster,
    showErrorToast: (message: string) => errorToast(message),
    showSuccessToast: (message: string) => successToast(message),
  };
}
