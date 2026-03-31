"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AUTH_STORAGE_KEY = "quickbites-auth";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);

      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        setIsLoggedIn(Boolean(parsedAuth?.isLoggedIn));
        setUser(parsedAuth?.user || null);
      }
    } catch (error) {
      console.error("Failed to read auth state:", error);
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const login = (userData) => {
    const nextState = {
      isLoggedIn: true,
      user: userData,
    };

    setIsLoggedIn(true);
    setUser(userData);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextState));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      isHydrated,
      isLoggedIn,
      user,
      login,
      logout,
    }),
    [isHydrated, isLoggedIn, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
