import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      
      // Logout user on 401 Unauthorized
      logout();
      // Redirect to login page or show a message
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    localStorage.setItem('token', response.data.access_token);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response.status === 402) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return { success: false, message: error.response.data.message || 'Login failed', status: error.response.status };
    } else if (error.request) {
      // The request was made but no response was received
      return { success: false, message: 'No response from server', status: null };
    } else {
      // Something happened in setting up the request that triggered an Error
      return { success: false, message: 'Error setting up request', status: null };
    }
  }
};

export const register = async (username, name, email, password) => {
  try {
    const response = await api.post('/register', { username, name, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const uploadFile = async (audioBlob, title) => {
  const formData = new FormData();
  formData.append('file', audioBlob, `${title}.wav`);

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getFiles = async (page) => {
  
  try {
    const response = await api.get('/list', {
    params: {
      page: page,
      per_page: 3
    }})

    return response.data;  

  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};