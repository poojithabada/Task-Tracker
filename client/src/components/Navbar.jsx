import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Grab the first letter of the user's name for the avatar
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <nav className="navbar light-navbar">
      <div className="navbar-left">
        <div className="navbar-brand">
          <span className="logo-icon">&lt;/&gt;</span> TaskTracker
        </div>
        <button className="nav-tasks-btn" onClick={() => navigate('/dashboard')}>
      My Tasks
    </button>
      </div>

      <div className="navbar-right">
        <div className="user-profile">
          <div className="user-avatar">{userInitial}</div>
          <span className="user-name">{user?.name || "User"}</span>
        </div>

        <button className="logout-btn-pill" onClick={handleLogout}>
      Log out
    </button>
      </div>
    </nav>
  );
};

export default Navbar;