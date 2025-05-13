"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  authApi,
  User,
  Internship,
  dashboardApi,
  Application,
  ApplicationDetailResponse,
  InternshipResponse,
  ApplicantsResponse,
} from "../_lib/api";

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
  getAllInternships: (
    queryParams: Record<string, string | number | boolean>
  ) => Promise<{
    internships: Internship[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
    };
  }>;
  internships: Internship[];
  getInternshipById: (id: string) => Promise<Internship>;
  applyForInternship: (id: string, formData: FormData) => Promise<void>;
  getAllApplicatons: () => Promise<Application[]>;
  getApplicationById: (id: string) => Promise<ApplicationDetailResponse>;
  postinternship: (formData: Internship) => Promise<void>;
  getAllMyPostedInternships: () => Promise<Internship[]>;
  getMypostedInternshipDetail: (id: string) => Promise<InternshipResponse>;
  editMyInternship: (id: string, formData: Internship) => Promise<Internship>;
  deleteInternship: (id: string) => Promise<void>;
  getAllApplicants: (id: string) => Promise<ApplicantsResponse[]>;
  getApplicant: (
    id: string,
    applicantId: string
  ) => Promise<ApplicantsResponse>;
  updateApplicantStatus: (
    status: string,
    applicationId: string
  ) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
  deleteUser: (id: string) => Promise<void>;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  reSendotp: (email: string) => Promise<void>;
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
      const { name, email: userEmail, role, photo, _id: id } = userData;
      localStorage.setItem(
        "userData",
        JSON.stringify({ name, email: userEmail, role, photo, _id: id })
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

  const verifyEmail = async (email: string, otp: string) => {
    try {
      setLoading(true);
      setError(null);
      await authApi.verifyEmail(email, otp);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to verify email";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const reSendotp = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await authApi.reSendotp(email);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to resend OTP";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    setError(null);
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

      // Ensure the response contains the updated photo
      const updatedPhoto = response.data?.user?.photo;

      // Update the user state with new information
      setUser((prevUser) => {
        if (!prevUser) return null;

        const updatedUser = {
          ...prevUser,
          name: (formData.get("name") as string) || prevUser.name,
          email: (formData.get("email") as string) || prevUser.email,
          photo: updatedPhoto || prevUser.photo,
        };

        // Update localStorage with the new user data
        localStorage.setItem("userData", JSON.stringify(updatedUser));

        return updatedUser;
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

  const getAllInternships = async (
    queryParams: Record<string, string | number | boolean> = {}
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

  const getInternshipById = async (id: string): Promise<Internship> => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardApi.getInternshipById(id);
      return response.internship;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch internship";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const applyForInternship = async (id: string, formData: FormData) => {
    try {
      setLoading(true);
      setError(null);
      await dashboardApi.applyForInternship(id, formData);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to apply for internship";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllApplicatons = async (): Promise<Application[]> => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardApi.getApplications();
      return response.applications;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch applications";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getApplicationById = async (
    id: string
  ): Promise<ApplicationDetailResponse> => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardApi.getApplicationById(id);
      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch application";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const postinternship = async (formData: Internship): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await dashboardApi.postInternship(formData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to post internship";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllMyPostedInternships = async (): Promise<Internship[]> => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardApi.getAllMyPostedInternships();
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch posted internships";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getMypostedInternshipDetail = async (
    id: string
  ): Promise<InternshipResponse> => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardApi.getMypostedInternshipDetail(id);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch internship";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editMyInternship = async (
    id: string,
    formData: Internship
  ): Promise<Internship> => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardApi.editMypostedInternship(id, formData);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch internship";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteInternship = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await dashboardApi.deleteInternship(id);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete internship";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllApplicants = async (
    id: string
  ): Promise<ApplicantsResponse[]> => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardApi.getAllApplicants(id);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch applicants";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getApplicant = async (
    id: string,
    applicantId: string
  ): Promise<ApplicantsResponse> => {
    try {
      setLoading(true);
      setError(null);

      const response = await dashboardApi.getApplicant(id, applicantId);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch applicants";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateApplicantStatus = async (
    status: string,
    applicationId: string
  ) => {
    try {
      setError(null);
      await dashboardApi.updateApplicantStatus(status, applicationId);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update applicant status";
      setError(errorMessage);
      throw error;
    }
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardApi.getAllusers();
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch users";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await dashboardApi.deleteUser(id);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete user";
      setError(errorMessage);
      throw error;
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
        verifyEmail,
        reSendotp,
        setError,
        forgotPassword,
        resetPassword,
        updatePersonalInfo,
        updatePassword,
        getAllInternships,
        getInternshipById,
        applyForInternship,
        getAllApplicatons,
        getApplicationById,
        postinternship,
        getAllMyPostedInternships,
        getMypostedInternshipDetail,
        editMyInternship,
        deleteInternship,
        getAllApplicants,
        getApplicant,
        updateApplicantStatus,
        getAllUsers,
        deleteUser,
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
