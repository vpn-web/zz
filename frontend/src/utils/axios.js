import axios from 'axios';
const instance = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3000/api' });
export default instance;
