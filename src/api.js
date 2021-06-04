import axios from 'axios';
import firebase from './firebase';
const api = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE,
});

api.interceptors.request.use(async (config) => {
  const user = firebase.auth().currentUser;
  if (user) {
    const token = await firebase.auth().currentUser.getIdToken(true);
    config.headers.Authentication = token;
  }
  return config;
});

export default api;
