import api from "./axios";

// Authentication API calls
export const authAPI = {
    register: async (userData) => {
        const response = await api.post("/auth/register", userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        return response.data;
    },

    logout: async () => {
        const response = await api.post("/auth/logout");
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get("/auth/me");
        return response.data;
    }
};

// Summarization API calls
export const summarizerAPI = {
    summarize: async (text, tone = "neutral") => {
        const response = await api.post("/summarize", { 
            originalText: text,
            tone: tone 
        });
        return response.data;
    },

    getSummaryHistory: async () => {
        const response = await api.get("/summarize/history");
        return response.data;
    },

    deleteSummary: async (id) => {
        const response = await api.delete(`/summarize/${id}`);
        return response.data;
    }
};

// User API calls
export const userAPI = {
    updateProfile: async (userData) => {
        const response = await api.put("/user/profile", userData);
        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await api.put("/user/password", passwordData);
        return response.data;
    },

    deleteAccount: async () => {
        const response = await api.delete("/user/account");
        return response.data;
    }
};

export default {
    auth: authAPI,
    summarizer: summarizerAPI,
    user: userAPI
};
