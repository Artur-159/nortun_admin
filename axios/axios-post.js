import axios from "axios";

const axiosPost = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPost.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPost.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response?.data?.message === "Unauthenticated.") {
        localStorage.clear();

        setTimeout(() => {
          window.location.replace("/login");
        }, 100);
      }

      throw new Error(error.response.data?.message);
    } else if (error.request) {
      console.error("Request error", error.request);
    } else {
      console.error("Error", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosPost;
