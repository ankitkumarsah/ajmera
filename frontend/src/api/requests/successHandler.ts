import { toast } from 'react-toastify';
import codeMessage from './codeMessage';

const successHandler = (response: any, options: any = { notifyOnSuccess: false, notifyOnFailed: true }) => {
  const { data } = response;
  if (data && data.success === true) {
    const message = response.data && data.message;
    const successText: any = message || codeMessage[response.status];
    if (options.notifyOnSuccess) {
      toast.success(successText, {
        position: "top-right", autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        theme: "colored",
      });
    }
  } else {
    const message = response.data && data.message;
    const errorText: any = message || codeMessage[response.status];
    if (options.notifyOnFailed) {
      toast.error(errorText, {
        position: "top-right", autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        theme: "colored",
      });
    }
  }
};

export default successHandler;
