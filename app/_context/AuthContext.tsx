"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authApi } from "../_lib/api";

// Simple auth context type
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  signOut: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in when the app starts
  useEffect(() => {
    const checkAuth = () => {
      const hasToken = authApi.isAuthenticated();
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
      await authApi.signIn(email, password);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to sign in");
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
      setError(null);
      await authApi.signUp(name, email, password, role);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to sign up");
      throw error;
    }
  };

  // Sign out function
  const signOut = () => {
    authApi.signOut();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, error, signIn, signUp, signOut }}
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
