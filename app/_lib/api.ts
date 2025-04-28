import axios from "axios";

// Base URL for the API
const BASE_URL = "https://intern-hub-server.onrender.com/api/v1";

// Create a reusable axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        "An error occurred";
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(new Error("No response from server"));
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(new Error("Request failed"));
    }
  }
);

// Automatically attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Types ---
// User type
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  photo?: string | null;
}

// Response wrapper type
interface ApiResponse<T> {
  status: string;
  data: T;
  token?: string;
}

// Token storage functions
const tokenStorage = {
  setToken(token: string) {
    localStorage.setItem("token", token);
  },
  getToken() {
    return localStorage.getItem("token");
  },
  removeToken() {
    localStorage.removeItem("token");
  },
  hasToken() {
    return !!localStorage.getItem("token");
  },
};

export const authApi = {
  // Login user
  async signIn(email: string, password: string) {
    const { data } = await api.post<ApiResponse<User>>("/user/signin", {
      email,
      password,
    });

    if (data.token) {
      tokenStorage.setToken(data.token);
    }
    return data;
  },

  // Register user
  async signUp(name: string, email: string, password: string, role: string) {
    const { data } = await api.post<ApiResponse<null>>("/user/signup", {
      name,
      email,
      password,
      role,
    });

    return data;
  },

  // Check if user is logged in
  isAuthenticated() {
    return tokenStorage.hasToken();
  },

  // Logout user
  signOut() {
    tokenStorage.removeToken();
  },
};
