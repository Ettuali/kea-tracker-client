import axios from "axios";

const API =
  "https://kea-tracker-server.onrender.com/api";

export const getProjects = () =>
  axios.get(`${API}/projects`);

export const createProject = (data) =>
  axios.post(`${API}/projects`, data);

export const getProjectById = (id) =>
  axios.get(`${API}/projects/${id}`);

export const addExpense = (data) =>
  axios.post(`${API}/expenses`, data);

export const updateExpense = (id, data) =>
  axios.put(`${API}/expenses/${id}`, data);

export const deleteExpense = (id) =>
  axios.delete(`${API}/expenses/${id}`);
