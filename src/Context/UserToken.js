import { createContext, useState } from "react";

export const UserTokenContext = createContext();

export default function UserTokenContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("userToken"));

  return (
    <UserTokenContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </UserTokenContext.Provider>
  );
}
