import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, SignupCredentials } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (credentials: SignupCredentials) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkUser = () => {
      try {
        const savedSession = localStorage.getItem('user_session');
        
        if (savedSession) {
          const userData = JSON.parse(savedSession);
          setAuthState({
            user: userData,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        localStorage.removeItem('user_session');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    checkUser();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Find the user by email in our users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', credentials.email)
        .single();

      if (userError || !userData) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      // Verify password
      if (userData.password !== credentials.password) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      // Set authentication state directly (bypass Supabase Auth)
      setAuthState({
        user: userData,
        isAuthenticated: true,
        isLoading: false
      });

      // Store session in localStorage for persistence
      localStorage.setItem('user_session', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('email', credentials.email)
        .single();

      if (existingUser) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      // Generate a unique ID for the user
      const userId = crypto.randomUUID();

      // Create user in our users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([{ 
          id: userId,
          username: credentials.username,
          email: credentials.email,
          password: credentials.password
        }])
        .select()
        .single();

      if (userError) {
        console.error('User creation error:', userError);
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      if (userData) {
        setAuthState({
          user: userData,
          isAuthenticated: true,
          isLoading: false
        });

        // Store session in localStorage for persistence
        localStorage.setItem('user_session', JSON.stringify(userData));
        
        return true;
      }

      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    try {
      // Clear session from localStorage
      localStorage.removeItem('user_session');
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (user: User) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(user)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Update user error:', error);
        throw error;
      }

      if (data) {
        setAuthState(prev => ({ ...prev, user: data }));
        // Update localStorage with new user data
        localStorage.setItem('user_session', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 