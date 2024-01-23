import axios from 'axios';
import { toast } from 'react-toastify';
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: { 'trx-key': '5124' }
});

api.interceptors.request.use(function (config: any) {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});

api.interceptors.response.use(function (response) {

  if (response.data.success == false) {
    toast.error(response.data.message, {
      position: "top-right", autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "colored",
    });
  }
  return response;
}, function (error) {
  if (error.response.status == 401) {
    toast.error(error.response.data.message, {
      position: "top-right", autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "colored",
    });
    window.localStorage.removeItem("token");
    return window.location.replace('/');
  }
  // Do something with response error
  return Promise.reject(error);
});
export default api;
