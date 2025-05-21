import axios from '@/utils/axios';
export const getProjects = () => axios.get('/projects');
export const addProject = name => axios.post('/projects', { name });
export const deleteProject = id => axios.delete(`/projects/${id}`);
export const getAddresses = pid => axios.get(`/projects/${pid}/addresses`);
export const addAddress = (pid, url) => axios.post(`/projects/${pid}/addresses`, { url });
export const deleteAddress = (pid, aid) => axios.delete(`/projects/${pid}/addresses/${aid}`);
