import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  username: string;
  email: string;
  setUser: (username: string, email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('Gamer_Nexus');
  const [email, setEmail] = useState('gamer_nexus@cyber.com');

  const setUser = (newUsername: string, newEmail: string) => {
    if (newUsername) setUsername(newUsername);
    if (newEmail) setEmail(newEmail);
  };

  return (
    <UserContext.Provider value={{ username, email, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};