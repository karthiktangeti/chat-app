import axios from "axios";

console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? `${import.meta.env.VITE_BACKEND_URL}/api`
      : "/api",
  withCredentials: true,
});
