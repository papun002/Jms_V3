import { useContext, createContext, useState } from "react";

const AuthContext = createContext(null);

const Authrize = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password, mType) => {
    setUser({ username: username, password: password, type: mType });
  };
  return (
    <AuthContext.Provider value={{ user, setUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default Authrize;
