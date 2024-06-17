import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
function LoginPage() {
  const { login } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    userLogin: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="center">
      <h3>Login</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(userInfo);
        }}
      >
        <label htmlFor="username">Email or username:</label>
        <input
          type="text"
          name="userLogin"
          value={userInfo.userLogin}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
