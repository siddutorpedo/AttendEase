import api from "./api";

/**
 * Attendance API service.
 */
const attendanceService = {
  getAll: async (params = {}) => {
    const { data } = await api.get("/attendance", { params });
    return data;
  },

  mark: async ({ subjectId, date, records }) => {
    const { data } = await api.post("/attendance/mark", { subjectId, date, records });
    return data;
  },

  getByStudent: async (studentId) => {
    const { data } = await api.get(`/attendance/student/${studentId}`);
    return data;
  },

  getBySubject: async (subjectId) => {
    const { data } = await api.get(`/attendance/subject/${subjectId}`);
    return data;
  },

  getPercentage: async (studentId, subjectId) => {
    const { data } = await api.get(`/attendance/percentage/${studentId}`, {
      params: subjectId ? { subjectId } : {},
    });
    return data;
  },

  getDefaulters: async (threshold = 75, params = {}) => {
    const { data } = await api.get("/attendance/defaulters", {
      params: { threshold, ...params },
    });
    return data;
  },

  getDashboardStats: async () => {
    const { data } = await api.get("/attendance/dashboard-stats");
    return data;
  },
};

export default attendanceService;

