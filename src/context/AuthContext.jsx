import React, { createContext, useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [error, setError] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState(false);
  

  
  //FUNCTION TO LOGIN A USER.
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully");
    } catch (err) {
      setError(err.message);
    }
  };



//FUNCTION TO CREATE A USER.
  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  //Function to logout a user
  const logout = async () => {
    try {
      await auth.signOut();
      alert("Logged out successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ login, signup, error ,logout,isAuthenticated,setisAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};