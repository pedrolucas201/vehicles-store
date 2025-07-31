// src/hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null); 
 
  const checkAuth = useCallback(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); 

    if (storedToken) {
      try {
        const { role, exp } = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;

        if (exp < currentTime) {
          console.warn("Token expirado.");
          localStorage.removeItem("token"); 
          setIsAdmin(false);
          setToken(null);
        } else {
          setIsAdmin(role === "admin");
        }
      } catch (err) {
        console.warn("Token inválido:", err);
        localStorage.removeItem("token"); 
        setIsAdmin(false);
        setToken(null);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();

  }, [checkAuth]);
 
    return { isAdmin, token, checkAuth };
  }