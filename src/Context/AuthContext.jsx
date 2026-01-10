import React, { createContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register with email and password
  const register = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update user profile
  const updateUserProfile = async (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    });
  };

  // Login with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Assign role based on email for demo purposes
        // In a real app, this would come from a database or custom claims
        if (currentUser.email === 'admin@ecotrack.com') {
          currentUser.role = 'admin';
        } else {
          currentUser.role = 'user';
        }
      }
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    register,
    updateUserProfile,
    login,
    googleSignIn,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};