"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authApi, User } from "../_lib/api";

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
  userData: User | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  // Check if user is logged in when the app starts
  useEffect(() => {
    const checkAuth = () => {
      const hasToken = authApi.isAuthenticated();
      if (hasToken) {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
        }
      }
      setIsAuthenticated(hasToken);
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.signIn(email, password);
      console.log("API Response photo:", response.data.photo);
      const userData = {
        ...response.data,
        photo: response.data.photo || null,
      };
      console.log("UserData photo:", userData.photo);
      setUserData(userData);
      // Only store essential data
      const { name, role, photo } = userData;
      localStorage.setItem("userData", JSON.stringify({ name, role, photo }));
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
      console.log("error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to sign up";
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
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        setError,
        userData,
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
