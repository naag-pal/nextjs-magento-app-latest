import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
  authToken: string;
}

type authContextType = {
  user: User;
  login: (user: User) => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: {
    email: '',
    authToken: '',
  },
  login: (user: User) => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>(null);

  // TODO: user login update
  const login = (user: User) => {
    setUser({
      email: user.email,
      authToken: user.authToken,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  useEffect(() => {
    // Perform localStorage action
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, []);

  useEffect(() => {
    if (user && user.authToken != '') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
