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


console.log('Good before call');
const response = api.post('/login', { "username": "dusadv", 
                                    "password": "abc" }).then(response => {
                                    console.log("Done");
                                    }).catch(err => {
                                    console.log("Error", err);
                                              });
console.log('Where is it?')
// console.log('Response', JSON.stringify(response.data));
// data = JSON.stringify(response.data);
// fs.writeFile('temp.json', data, (err) => {
//     if (err) {
//         console.error('Error writing to file:', err);
//     } else {
//         console.log('File has been written');
//     }
// });


// const login = async (username, password) => {
//     console.log('Kaka');
//     // try {
//       const response = await api.post('/login', { username, password });
//       console.log('Daada');
      
//       if (response.data.access_token) {
//         localStorage.setItem('token', response.data.access_token);
//         return { success: true, data: response.data };
//       } else {
//         console.log('Mama');
//         return { success: false, message: response.data.message };
//       }
//     // } catch (error) {
//     //   throw error.response.data;
//     // }
//   };