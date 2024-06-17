import { createContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  //SIGN UP FUNCTION / REQUEST
  const signup = async (body) => {
    try {
      const response = await api.post("/users/signup", body);

      navigate("/login");
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  //LOGIN FUNCTION / REQUEST

  const login = async (body) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      let response;

      //if regex matches and finds email pattern, request login with email
      if (emailRegex.test(body.userLogin)) {
        response = await api.post("/users/login", {
          email: body.userLogin,
          password: body.password,
        });
      } else {
        //if regex doesn't match email pattern, request login with username
        response = await api.post("/users/login", {
          username: body.userLogin,
          password: body.password,
        });
      }

      if (response.status === 200 || response.status(201)) {
        setIsLoggedIn(true);
        setUser(response.data.user);
        localStorage.setItem("authToken", response.data.jwtToken);
        navigate("/projects");
      } else {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.clear();
      }
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const verifyUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await api.get("/users/verify");

        setIsLoggedIn(true);
        setUser(response.data.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
