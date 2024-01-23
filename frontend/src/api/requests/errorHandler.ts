import codeMessage from './codeMessage';
import { toast } from 'react-toastify';

const errorHandler = (error: any) => {
  const { response } = error;

  if (response && response.status) {
    const message = response.data && response.data.message;

    const errorText = message || codeMessage[response.status];
    // const { status } = response;
    toast.error(errorText, {
      position: "top-right", autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "colored",
    });
    // if (response.data && response.data.jwtExpired) {
    //   history.push('/logout');
    // }
    return response.data;
  } else {
    toast.error('Cannot connect to the server, Check your internet network', {
      position: "top-right", autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "colored",
    });
    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server, Check your internet network',
    };
  }
};

export default errorHandler;
