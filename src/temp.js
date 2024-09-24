console.log('Kaka');

const axios = require('axios');
const fs = require('fs');

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add auth token
api.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNzA3MDgwNiwianRpIjoiMzkyMzZjMzctOTU0ZS00MWJhLWE0ZjYtM2EzZDViYjFiN2U1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImR1c2FkdiIsIm5iZiI6MTcyNzA3MDgwNiwiY3NyZiI6ImZiODY0ODI1LTZmNzEtNGUxZi1hOTNiLWI3OGZhNmJjMmZlOCIsImV4cCI6MTcyNzA3MTcwNn0.9BTTcCHYfjoGnK0h4zCX8pxZlAsQ1HdkNXf9hx22q1I" //localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


const getFiles = async () => {
  try {
    const response = await api.get('/list');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

getFiles()

const login = async (username='dusadv', password='Varshit123#') => {
  console.log('Hiii')
  try {
    const response = await api.post('/login', { username, password });
    console.log({ success: true, data: response.data })
  } catch (error) {
    if (error.response.status >= 400) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log({ success: false, message: error.response.data.message || 'Login failed', status: error.response.status });
    } else if (error.request) {
      // The request was made but no response was received
      console.log({ success: false, message: 'No response from server', status: null });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log({ success: false, message: 'Error setting up request', status: null });
    }
  }
};

// login()

////////


// import axios from 'axios';
// import { useNavigate} from 'react-router-dom';

// const API_URL = 'http://localhost:5000';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Intercept requests to add auth token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// // Add response interceptor to handle 401 errors
// // api.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (error.response && error.response.status === 401 && localStorage.getItem('token')) {
// //       // Logout user on 401 Unauthorized
// //       logout();
// //       // Redirect to login page or show a message
// //       const navigate = useNavigate();
// //       navigate('/login');
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// export const login = async (username, password) => {
//   console.log('From API ',username, password);
//   try {
//     console.log('Making request');
//     const response = await api.post('/login', { username, password }).then(response => console.log(response))
//     .catch(error => console.error('Error:', error));
    

//     localStorage.setItem('token', response.data.access_token);
//     return { success: true, data: response.data };
//   } catch (error) {
//     console.log('Error ',error);
//     if (error.response.status >= 400) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       return { success: false, message: error.response.data.message || 'Login failed', status: error.response.status };
//     } else if (error.request) {
//       // The request was made but no response was received
//       return { success: false, message: 'No response from server', status: null };
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       return { success: false, message: 'Error setting up request', status: null };
//     }
//   }
//   console.log('After try catch');
// };

// export const register = async (username, name, email, password) => {
//   try {
//     const response = await api.post('/register', { username, name, email, password });
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// export const logout = () => {
//   localStorage.removeItem('token');
// };

// export const uploadFile = async (audioBlob, title) => {
//   const formData = new FormData();
//   formData.append('file', audioBlob, `${title}.wav`);

//   try {
//     const response = await api.post('/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw error;
//   }
// };

// export const getFiles = async () => {
//   console.log('Getting filessss');
//   try {
//     const response = await api.get('/list');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching files:', error);
//     throw error;
//   }
// };