import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const authContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function that sets the user state and stores the token in localStorage
  const login = (user) => {
    setUser(user);
    localStorage.setItem("token", user.token); // Store token when logging in
  };

  // Logout function that removes the token and clears user state
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Get the token from localStorage and send a request to verify it
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if the response is successful and set the user accordingly
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null); // Invalid token, user should be logged out
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setUser(null); // Ensure user is logged out on error
      }
    };

    verifyUser();
  }, []); // This runs once on mount

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(authContext);

export default ContextProvider;
