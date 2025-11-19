import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types';
import { signInWithGoogle, signOutUser } from '../services/auth';


export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Simula o check inicial de autenticação
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Se quiser testar logado, descomente abaixo:
        // const user = await signInWithGoogle();
        // setCurrentUser(user);
      } catch (error) {
        console.error("Initial auth check failed", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async () => {
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      setCurrentUser(user);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await signOutUser();
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { currentUser, loading, login, logout };
};
