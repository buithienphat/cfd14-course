import axiosInstance from "../utils/axiosIntance";

export const galleryService = {
  getGalleries(query = "") {
    return axiosInstance.get(`/galleries${query}`);
  },
};
