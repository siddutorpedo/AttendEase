import api from "./api";

/**
 * Student API service.
 */
const studentService = {
  getAll: async (params = {}) => {
    const { data } = await api.get("/students", { params });
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/students/${id}`);
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/students/${id}`);
    return data;
  },
};

export default studentService;
