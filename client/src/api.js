import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:5000/api" });
export const getStudents = () => api.get("/students");
export const getStudent = (id) => api.get(`/students/${id}`);
export const addStudent = (data) => api.post("/students", data);
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);
export default api;