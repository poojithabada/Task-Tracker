import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", formData);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      
      {/* App Logo placed outside the card like in the image */}
      <div className="app-logo">
        <span className="logo-icon">✓</span> TaskTracker
      </div>

      <div className="login-card">
        <h2>Welcome back</h2>
        <p className="subtitle">Sign in to manage your tasks</p>

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <div className="bottom-text">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>

      </div>
    </div>
  );
};

export default Login;