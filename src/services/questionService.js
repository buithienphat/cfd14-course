import axiosInstance from "../utils/axiosIntance";

export const questionService = {
  getQuestions(query = "") {
    return axiosInstance.get(`questions${query}`);
  },
};
