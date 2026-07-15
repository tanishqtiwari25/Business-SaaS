import axios from 'axios';

// Backend ka base URL (Aapka port 5000 hai)
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request Interceptor: Agar user logged in hai, toh har request ke header me Token automatic chala jaye
API.interceptors.request.use((config) => {
  const profile = localStorage.getItem('user');
  if (profile) {
    const { token } = JSON.parse(profile);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==========================================
// AUTHENTICATION APIS
// ==========================================

// 1. Register API
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Registration Failed!");
  }
};

// 2. Login API
export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Login Failed!");
  }
};

// 3. Logout Helper
export const logoutUser = () => {
  localStorage.removeItem('user');
};

export default API;