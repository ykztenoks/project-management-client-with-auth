import "./App.css";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };
  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* //ROUTES ONLY AVAILABLE IF NOT LOGGED IN */}
        <Route element={<NotLoggedIn />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* //ROUTES ONLY AVAILABLE IF USER IS LOGGED IN */}

        <Route element={<LoggedIn />}>
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route
            path="/projects/edit/:projectId"
            element={<EditProjectPage />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
