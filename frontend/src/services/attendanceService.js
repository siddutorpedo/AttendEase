import api from "./api";

/**
 * Attendance API service.
 */
const attendanceService = {
  getAll: async () => {
    const { data } = await api.get("/attendance");
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
};

export default attendanceService;
