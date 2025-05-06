import axios from "axios";

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
  photo: string | null;
}

// Internship type

export interface Company {
  _id: string;
  name: string;
}

// types.ts
export interface InternshipResponse {
  internship: {
    _id: string;
    title: string;
    CompanyName: string;
    department: string;
    startDate: string;
    endDate: string;
    description: string;
    requiredSkills: string[];
    location: string;
    remote: boolean;
    paid: boolean;
    numPositions: number;
    applicationDeadline: string;
    companyId: {
      _id: string;
    };
    applicants: string[];
    createdAt: string;
  };
}
export interface Internship {
  _id: string;
  title: string;
  CompanyName: string;
  department: string;
  startDate: string;
  endDate: string;
  description: string;
  requiredSkills: string[];
  location: string;
  remote: boolean;
  paid: boolean;
  numPositions: number;
  applicationDeadline: string;
  companyId: {
    _id: string;
  };
  applicants: string[];
  createdAt: string;
}

//applicationDetailResponse

export interface ApplicationDetailResponse {
  applicationId: string;
  application: {
    id: string;
    appliedAt: string;
    coverLetter: string;
    portfolio: string;
    status: "pending" | "accepted" | "rejected";
  };
  internship: {
    title: string;
    companyName: string;
    department: string;
    location: string;
    remote: boolean;
    paid: boolean;
    startDate: string;
    endDate: string;
    applicationDeadline: string;
  };
}

// application type

export interface Application {
  applicationId: string;
  internshipId: string;
  title: string;
  companyName: string;
  department: string;
  startDate: string;
  endDate: string;
  location: string;
  remote: boolean;
  paid: boolean;
  applicationStatus: "pending" | "accepted" | "rejected";
  applicationDeadline: string;
  numPositions: number;
  description: string;
  requiredSkills: string[];
  coverLetter: string;
  portfolio: string;
  appliedAt: string;
}

export interface ApplicantsResponse {
  applicationId: string;
  studentId: string;
  name: string;
  email: string;
  photo: string;
  application: {
    coverLetter: string;
    portfolio: string;
    appliedAt: string;
  };
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
}

// Response wrapper type
interface ApiResponse<T> {
  internship: Internship | PromiseLike<Internship>;
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

  // Forgot password
  async forgotPassword(email: string) {
    const { data } = await api.post<ApiResponse<null>>(
      "/user/forgot-password",
      {
        email,
      }
    );
    return data;
  },

  // Reset password
  async resetPassword(token: string, password: string) {
    const { data } = await api.patch<ApiResponse<null>>(
      "/user/reset-password",
      {
        token,
        password,
      }
    );
    return data;
  },

  async updatePersonalInfo(formData: FormData) {
    const { data } = await api.patch<
      ApiResponse<{
        user: {
          photo: string;
        };
      }>
    >("/user/update-me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  async updatePassword(currentPassword: string, newPassword: string) {
    const { data } = await api.patch<ApiResponse<null>>(
      "/user/update-password",
      {
        currentPassword: currentPassword,
        password: newPassword,
      }
    );
    return data;
  },

  async deleteAccount() {
    const { data } = await api.delete<ApiResponse<null>>("/user/delete-me");
    return data;
  },
};

export const dashboardApi = {
  async getAllInternships(queryParams = {}) {
    const { data } = await api.get<{
      status: string;
      results: number;
      pagination: {
        total: number;
        page: number;
        pages: number;
        limit: number;
      };
      data: { internships: Internship[] };
    }>("/internships", { params: queryParams });

    return {
      internships: data.data.internships,
      pagination: data.pagination,
    };
  },

  async getInternshipById(id: string) {
    const { data } = await api.get<ApiResponse<Internship>>(
      `/internships/${id}`
    );

    return data;
  },

  async applyForInternship(id: string, formData: FormData) {
    const { data } = await api.post<ApiResponse<null>>(
      `/internships/${id}/apply`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },

  async getApplications() {
    const { data } = await api.get<ApiResponse<Application[]>>(
      "/internships/my-applications"
    );

    return data.data;
  },

  async getApplicationById(id: string) {
    const { data } = await api.get<ApiResponse<ApplicationDetailResponse>>(
      `/internships/${id}/application`
    );
    return data;
  },

  async postInternship(formData: Internship) {
    const { data } = await api.post<ApiResponse<Internship>>(
      "/internships/postInternship",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  },

  async getAllMyPostedInternships() {
    const { data } = await api.get<ApiResponse<{ internships: Internship[] }>>(
      "/internships/allMypostedInterships"
    );

    return data.data.internships;
  },

  async getMypostedInternshipDetail(id: string) {
    const { data } = await api.get<ApiResponse<InternshipResponse>>(
      `/internships/posted/${id}`
    );
    return data.data;
  },

  async editMypostedInternship(id: string, formData: Internship) {
    const { data } = await api.patch<ApiResponse<Internship>>(
      `/internships/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data;
  },

  async deleteInternship(id: string) {
    const { data } = await api.delete<ApiResponse<null>>(`/internships/${id}`);
    return data;
  },

  async getAllApplicants(id: string) {
    const { data } = await api.get<ApiResponse<ApplicantsResponse[]>>(
      `internships/${id}/applicants`
    );

    return data.data;
  },

  async getApplicant(id: string, applicantId: string) {
    const { data } = await api.get<ApiResponse<ApplicantsResponse>>(
      `/internships/${id}/applicants/${applicantId}`
    );

    return data.data;
  },

  async updateApplicantStatus(status: string, applicationId: string) {
    const { data } = await api.patch<ApiResponse<null>>(
      `/internships/update-application-status`,
      {
        applicationId,
        status,
      }
    );
    return data;
  },

  async getAllusers() {
    const { data } = await api.get<ApiResponse<{ users: User[] }>>(
      `/admin/users`
    );
    return data.data.users;
  },

  async deleteUser(id: string) {
    const { data } = await api.delete<ApiResponse<null>>(`/admin/users/${id}`);
    return data;
  },
};
