import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to project management app!</h1>

      <p>start managing your company effortlessly</p>

      <p>not registered yet? sign up now!</p>
      <Link to="/signup">Sign up</Link>
    </div>
  );
}

export default HomePage;
