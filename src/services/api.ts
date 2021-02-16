import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers:{
    'x-access-token' : 'eyJhbGciOiJIUzI1NiJ9.MDIxMjU3OTYtODAxOC00NWViLWFjNTQtMmNiM2FkYTQyYjZi.27Zs9ZsWxixusX2O0ofEfaeEedgaX7Gn6afIxMhNMhs'
  }
});

export default api;