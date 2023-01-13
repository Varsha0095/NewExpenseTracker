import React, { useState } from "react";

const AuthContext = React.createContext({
    token: "",
    email: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
  });

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);
  const initialEmail = localStorage.getItem('email');
  const [email, setEmail] = useState(initialEmail);

  const userIsLoggedIn = !!token;

  const logInHandler = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setToken(token);
    setEmail(email);
  };
  const logOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
  };
  const ContextValue = {
    token: token,
    email: email,
    isLoggedIn: userIsLoggedIn,
    login: logInHandler,
    logout: logOutHandler,
  };
  return (
    <AuthContext.Provider value={ContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
