import api from "./api";

/**
 * Subject API service.
 */
const subjectService = {
  getAll: async () => {
    const { data } = await api.get("/subjects");
    return data;
  },

  create: async (payload) => {
    const { data } = await api.post("/subjects", payload);
    return data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/subjects/${id}`, payload);
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/subjects/${id}`);
    return data;
  },
};

export default subjectService;
