import axios from 'axios';

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

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
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
    const response = await axios.post(`${API_URL}/upload`, formData, {
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

export const getFiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};