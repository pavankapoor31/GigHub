
import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
// import { startMeeting } from "./createOrJoinRoom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      // onAuthStateChanged(auth, (user) => {
      //   if (user) {
      //     setCurrentUser(user);
      //     setLoading(false);
      //   } else {
      //     setCurrentUser(null);
      //     setLoading(false);
      //   }
      // }).catch((error) => {
      //     setLoading(false);
      //     console.error(error);
      //     setCurrentUser(null);
      // });

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
          setLoading(false);
        } else {
          setCurrentUser(null);
          setLoading(false);
        }
      });

      return () => unsubscribe();

    },[]);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <AuthContext.Provider value={{ currentUser }}>
          {children}
        </AuthContext.Provider>
    );
}