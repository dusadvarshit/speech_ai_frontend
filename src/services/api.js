import axios from 'axios';

const API_URL = 'http://localhost:5000';

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