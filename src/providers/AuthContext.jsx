import React, { createContext, useContext, useState, useEffect } from "react";

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        const userData = localStorage.getItem("user_data");

        if (accessToken && refreshToken && userData) {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear corrupted data
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Clear all auth data
  const clearAuthData = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    setUser(null);
    setIsAuthenticated(false);
  };

  // Login function
  const login = (authResponse) => {
    try {
      // Store tokens
      localStorage.setItem("access_token", authResponse.access);
      localStorage.setItem("refresh_token", authResponse.refresh);

      // Store user data (excluding sensitive tokens)
      const userData = {
        id: authResponse.id,
        username: authResponse.username,
        email: authResponse.email,
        first_name: authResponse.first_name,
        last_name: authResponse.last_name,
        profile_image: authResponse.profile_image,
        remaining_api_requests: authResponse.remaining_api_requests,
        is_superuser: authResponse.is_superuser,
        is_staff: authResponse.is_staff,
        is_active: authResponse.is_active,
        date_joined: authResponse.date_joined,
        last_login: authResponse.last_login,
      };

      localStorage.setItem("user_data", JSON.stringify(userData));

      // Update state
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error("Error storing auth data:", error);
      return { success: false, error: "Failed to store authentication data" };
    }
  };

  // Logout function
  const logout = () => {
    clearAuthData();
  };

  // Update user data (for profile updates, etc.)
  const updateUser = (updatedUserData) => {
    try {
      const newUserData = { ...user, ...updatedUserData };
      localStorage.setItem("user_data", JSON.stringify(newUserData));
      setUser(newUserData);
      return { success: true };
    } catch (error) {
      console.error("Error updating user data:", error);
      return { success: false, error: "Failed to update user data" };
    }
  };

  // Get access token
  const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };

  // Get refresh token
  const getRefreshToken = () => {
    return localStorage.getItem("refresh_token");
  };

  // Update tokens (for token refresh)
  const updateTokens = (accessToken, refreshToken) => {
    try {
      localStorage.setItem("access_token", accessToken);
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }
      return { success: true };
    } catch (error) {
      console.error("Error updating tokens:", error);
      return { success: false, error: "Failed to update tokens" };
    }
  };

  // Check if user has specific permission/role
  const hasPermission = (permission) => {
    if (!user) return false;

    switch (permission) {
      case "admin":
        return user.is_superuser;
      case "staff":
        return user.is_staff;
      case "active":
        return user.is_active;
      default:
        return false;
    }
  };

  // Get user's display name
  const getDisplayName = () => {
    if (!user) return "";

    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    } else if (user.first_name) {
      return user.first_name;
    } else if (user.username) {
      return user.username;
    } else {
      return user.email;
    }
  };

  const contextValue = {
    // State
    user,
    isAuthenticated,
    isLoading,

    // Functions
    login,
    logout,
    updateUser,
    getAccessToken,
    getRefreshToken,
    updateTokens,
    hasPermission,
    getDisplayName,

    // User properties for easy access
    userId: user?.id,
    username: user?.username,
    email: user?.email,
    remainingApiRequests: user?.remaining_api_requests,
    profileImage: user?.profile_image,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
