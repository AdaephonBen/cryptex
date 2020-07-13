import axios from "axios";

export const AxiosAuth = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/auth/`,
  withCredentials: true,
});

export const AxiosAPIPublic = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/`,
});

export const AxiosAPIProtected = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/`,
  withCredentials: true,
});
