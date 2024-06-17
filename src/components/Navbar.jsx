import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
function Navbar() {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav>
      <div className="welcome">
        <h3>Project management client</h3> -{" "}
        {user && <span>Welcome, {user.username}</span>}
      </div>
      <div>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/projects">
          <button>Projects</button>
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
