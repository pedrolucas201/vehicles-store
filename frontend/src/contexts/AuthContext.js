// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = useCallback(() => {
    console.log("AuthContext: Iniciando checkAuthStatus..."); // LOG 1
    const token = localStorage.getItem('token');
    console.log("AuthContext: Token do localStorage:", token ? "presente" : "ausente"); // LOG 2

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("AuthContext: Token decodificado:", decoded); // LOG 3

        // Verifica se o token expirou (tempo em segundos no JWT, Date.now() em milissegundos)
        if (decoded.exp * 1000 < Date.now()) {
          console.warn("AuthContext: Token expirado, efetuando logout."); // LOG 4
          logout();
        } else {
          setUser(decoded);
          const currentIsAdmin = decoded.role === 'admin';
          setIsAdmin(currentIsAdmin);
          console.log("AuthContext: isAdmin setado para:", currentIsAdmin); // LOG 5
        }
      } catch (error) {
        console.error("AuthContext: Erro ao decodificar token JWT:", error); // LOG 6
        logout();
      }
    } else {
      setUser(null);
      setIsAdmin(false);
      console.log("AuthContext: Nenhum token, isAdmin setado para false."); // LOG 7
    }
    setLoading(false);
    console.log("AuthContext: checkAuthStatus concluído. Final isAdmin:", isAdmin); // LOG 8 (Este isAdmin pode ser o valor anterior devido ao closure)
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = (token) => {
    console.log("AuthContext: Função login chamada."); // LOG 9
    localStorage.setItem('token', token);
    checkAuthStatus(); // Dispara a reavaliação do token
  };

  const logout = () => {
    console.log("AuthContext: Função logout chamada."); // LOG 10
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false);
  };

  const authValue = {
    user,
    isAdmin, // Valor atual de isAdmin
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};