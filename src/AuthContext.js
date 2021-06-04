import React, { useContext, useEffect, useState } from 'react';
import firebase from './firebase';
import api from './api';
import mixpanel from 'mixpanel-browser';

const AuthContext = React.createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function (user) {
      setUser(user);
      if (user) {
        const token = await user.getIdToken();
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        mixpanel.identify(user.uid);
        mixpanel.people.set({ $email: user.email });
      }

      setInitialLoad(true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, initialLoad }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth, useContext };
