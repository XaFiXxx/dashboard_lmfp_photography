import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Au chargement, on vérifie la présence du token et de l'utilisateur dans les cookies
  useEffect(() => {
    const token = Cookies.get('auth_token');
    const storedUser = Cookies.get('auth_user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erreur lors du parsing de l'utilisateur stocké", error);
      }
    }
  }, []);

  // La méthode login stocke le token et l'utilisateur dans les cookies et met à jour le contexte
  const login = (userData, token) => {
    Cookies.set('auth_token', token, { expires: 7, path: '/' });
    Cookies.set('auth_user', JSON.stringify(userData), { expires: 7, path: '/' });
    setIsAuthenticated(true);
    setUser(userData);
  };

  // La méthode logout appelle l'API et nettoie les cookies et l'état
  const logout = async () => {
    try {
      const token = Cookies.get('auth_token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/dash/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    } finally {
      Cookies.remove('auth_token', { path: '/' });
      Cookies.remove('auth_user', { path: '/' });
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
