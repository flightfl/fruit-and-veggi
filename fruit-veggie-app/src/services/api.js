import axios from 'axios';

// Frontend sends API requests to the backend server running at port: 5000
const API_URL = 'http://localhost:5000/api';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true // for cookies
});

// Produce API functions
export const getProduceItems = async () => {
  const response = await api.get('/produce'); // send a GET request to http://localhost:5000/api/products
  return response.data;
};

export const getProduceById = async (id) => {
  const response = await api.get(`/produce/${id}`);
  return response.data;
};

// User API functions
export const login = async (name) => {
  const response = await api.post('/users/login', { name });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/users/logout');
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Favorites API functions
export const addToFavorites = async (produceId) => {
  const response = await api.post('/users/favorites', { produceId });
  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get('/users/favorites');
  return response.data;
};

export const removeFromFavorites = async (produceId) => {
  const response = await api.delete(`/users/favorites/${produceId}`);
  return response.data;
};