import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Request interceptor → attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor → handle expired token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token is expired and we haven't retried yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh_token");
      if (refresh) {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
            refresh,
          });

          // Save new access token
          localStorage.setItem("token", res.data.access);
          api.defaults.headers.Authorization = `Bearer ${res.data.access}`;

          // Retry original request
          return api(originalRequest);
        } catch (err) {
          console.error("Token refresh failed:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login"; // redirect to login
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;