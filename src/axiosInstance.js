import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"
// const BASE_URL = "https://api.wadjetapp.com"

const defaultAPI = axios.create({
   baseURL: BASE_URL,
});

// Add a request interceptor
defaultAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Locale = `${localStorage.getItem("lang")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default defaultAPI;
