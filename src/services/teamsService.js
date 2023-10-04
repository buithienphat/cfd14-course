import axiosInstance from "../utils/axiosIntance";

export const teamService = {
  getTeams(query = "") {
    return axiosInstance.get(`teams${query}`);
  },
};
