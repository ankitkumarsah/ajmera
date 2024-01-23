import api from "../api";
import errorHandler from "./errorHandler";
import successHandler from "./successHandler";

const request = {
  post: async ({ url, jsonData }: any, notifyOnSuccess = true, notifyOnFailed = false) => {
    try {
      const response = await api.post(url, jsonData);
      successHandler(response, {
        notifyOnSuccess,
        notifyOnFailed,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  get: async ({ url }: any) => {
    try {
      const response = await api.get(url);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

}

export default request;