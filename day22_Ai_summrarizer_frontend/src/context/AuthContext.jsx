import { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        // Guard: localStorage may contain the string "undefined" or malformed JSON
        if (token && userData && userData !== "undefined") {
            try {
                const parsed = JSON.parse(userData);
                // Basic validation: parsed should be an object with at least an email or id
                if (parsed && typeof parsed === 'object') {
                    setUser(parsed);
                } else {
                    throw new Error('Parsed user is not an object');
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
                // Clean up bad data so subsequent loads don't fail
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    // Register function
    const register = async (userData) => {
        try {
            // Transform data to match backend structure
            const backendData = {
                fullname: {
                    firstname: userData.firstName,
                    lastname: userData.lastName
                },
                email: userData.email,
                password: userData.password
            };
            
            const response = await api.post("/auth/register", backendData);
            const token = response.data?.token;
            // Some backends may not return user object on register
            const userInfo = response.data?.user ?? {
                email: userData.email,
                fullname: {
                    firstname: userData.firstName,
                    lastname: userData.lastName,
                },
            };
            
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userInfo));
            setUser(userInfo);
            
            return { success: true, data: response.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || "Registration failed";
            return { success: false, error: errorMessage };
        }
    };

    // Login function
    const login = async (credentials) => {
        try {
            const response = await api.post("/auth/login", credentials);
            const token = response.data?.token;
            // Fallback user if backend returns only token
            const userInfo = response.data?.user ?? { email: credentials.email };
            
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userInfo));
            setUser(userInfo);
            
            return { success: true, data: response.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || "Login failed";
            return { success: false, error: errorMessage };
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        }
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        // Consider authenticated if we have a user in state or a token stored
        isAuthenticated: !!user || !!localStorage.getItem("token"),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
