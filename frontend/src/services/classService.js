import api from "./api";

/**
 * Class API service.
 */
const classService = {
  getAll: async () => {
    const { data } = await api.get("/classes");
    return data;
  },

  create: async (payload) => {
    const { data } = await api.post("/classes", payload);
    return data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/classes/${id}`, payload);
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/classes/${id}`);
    return data;
  },
};

export default classService;
