import { toast } from 'react-toastify';

export const showSuccessToastMessage = () => {
  toast.success('You have successfully logged!', {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const showErrorToastMessage = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
