import { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
