import axiosInstance from "../utils/axiosIntance";

export const subscribesService = {
  subscribes(payload = {}) {
    return axiosInstance.post(`/subscribes`, payload);
  },
};
