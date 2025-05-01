"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authApi, User, Internship, dashboardApi } from "../_lib/api";

// Simple auth context type
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  signOut: () => void;
  user: User | null;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updatePersonalInfo: (formData: FormData) => Promise<void>;
  updatePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  getAllInternships: () => Promise<{
    internships: Internship[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
    };
  }>;
  internships: Internship[];
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is logged in when the app starts
  useEffect(() => {
    const checkAuth = () => {
      const hasToken = authApi.isAuthenticated();
      if (hasToken) {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setUser(parsedData);
        }
      }
      setIsAuthenticated(hasToken);
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Sign up function
  const signUp = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      await authApi.signUp(name, email, password, role);
      setIsAuthenticated(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to sign up";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.signIn(email, password);
      const userData = {
        ...response.data,
        photo: response.data.photo || null,
      };
      setUser(userData);
      const { name, email: userEmail, role, photo } = userData;
      localStorage.setItem(
        "userData",
        JSON.stringify({ name, email: userEmail, role, photo })
      );
      setIsAuthenticated(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to sign in";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    authApi.signOut();
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await authApi.forgotPassword(email);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to forgot password";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (token: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await authApi.resetPassword(token, password);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to reset password";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update personal info function
  const updatePersonalInfo = async (formData: FormData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.updatePersonalInfo(formData);

      // Update the user state with new information
      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          name: (formData.get("name") as string) || prevUser.name,
          email: (formData.get("email") as string) || prevUser.email,
          photo: response.data?.photo || prevUser.photo,
        };
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update personal info";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // Update password function
  const updatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      await authApi.updatePassword(currentPassword, newPassword);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update password";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get all the Internship
  // const getAllInternships = async (): Promise<Internship[]> => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const data = await dashboardApi.getAllInternships();
  //     return data.internships;
  //   } catch (error) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : "Failed to fetch internships";
  //     setError(errorMessage);
  //     return [];
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getAllInternships = async (
    queryParams = {}
  ): Promise<{
    internships: Internship[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
    };
  }> => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardApi.getAllInternships(queryParams);
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch internships";
      setError(errorMessage);
      return {
        internships: [],
        pagination: { total: 0, page: 1, pages: 1, limit: 10 },
      };
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        error,
        internships: [],
        user,
        signIn,
        signUp,
        signOut,
        setError,
        forgotPassword,
        resetPassword,
        updatePersonalInfo,
        updatePassword,
        getAllInternships,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
