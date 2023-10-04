// services/courseService.js

import axiosInstance from "../utils/axiosIntance";

export const courseService = {
  getCourses(query = "") {
    return axiosInstance.get(`/courses${query}`);
  },
  getCourseBySlug(slug = "") {
    return axiosInstance.get(`/courses/${slug}`);
  },
};
