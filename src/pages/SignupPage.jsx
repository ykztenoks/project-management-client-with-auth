import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
function SignupPage() {
  const { signup } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [checkPassword, setCheckPassword] = useState("");

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="center">
      <h3>Sign up!</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup(userInfo);
        }}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
        />

        <label htmlFor="check-password">
          Confirm password:{" "}
          {userInfo.password === checkPassword ? (
            <span>☑️</span>
          ) : (
            <span>❌</span>
          )}
        </label>
        <input
          type="password"
          name="check-password"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignupPage;
