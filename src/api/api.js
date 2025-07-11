import axios from 'axios';
const API = axios.create({ baseURL: '/api' });

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const createProduct = (data, token) => API.post('/products', data, { headers: { Authorization: `Bearer ${token}` } });
export const getMyProducts = (token) => API.get('/products/mine', { headers: { Authorization: `Bearer ${token}` } });
export const deleteProduct = (id, token) => API.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const updateProduct = (id, data, token) => API.put(`/products/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
