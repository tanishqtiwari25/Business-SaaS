import axios from 'axios';

// ==========================================
// API CONFIGURATION
// ==========================================

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'https://business-saas.onrender.com/api',

  headers: {
    'Content-Type': 'application/json',
  },
});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================

API.interceptors.request.use(
  (config) => {
    const profile = localStorage.getItem('user');

    if (profile) {
      try {
        const userData = JSON.parse(profile);

        if (userData?.token) {
          config.headers.Authorization = `Bearer ${userData.token}`;
        }
      } catch (error) {
        console.error('Invalid user data in localStorage:', error);
        localStorage.removeItem('user');
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// REGISTER
// ==========================================

export const registerUser = async (userData) => {
  try {
    console.log('📤 Register request:', userData);

    const response = await API.post('/auth/register', userData);

    console.log('📥 Register response:', response.data);

    if (response.data?.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;

  } catch (error) {
    console.error('❌ Registration error:', error);

    if (error.response) {
      throw error.response.data;
    }

    throw new Error(
      error.message || 'Registration failed!'
    );
  }
};

// ==========================================
// LOGIN
// ==========================================

export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);

    if (response.data?.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;

  } catch (error) {
    console.error('❌ Login error:', error);

    if (error.response) {
      throw error.response.data;
    }

    throw new Error(
      error.message || 'Login failed!'
    );
  }
};

// ==========================================
// LOGOUT
// ==========================================

export const logoutUser = () => {
  localStorage.removeItem('user');
};

// ==========================================
// EXPORT
// ==========================================

export default API;