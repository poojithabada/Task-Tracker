import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/login.css"; // Reusing the same stylesheet

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await API.post("/auth/register", formData);
      alert("Registration Successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      
      {/* App Logo placed outside the card to match Login */}
      <div className="app-logo">
        <span className="logo-icon">✓</span> TaskTracker
      </div>

      <div className="login-card">
        <h2>Create an account</h2>
        <p className="subtitle">Sign up to start managing your tasks</p>

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        <div className="bottom-text">
          Already have an account? <Link to="/">Sign In</Link>
        </div>

      </div>
    </div>
  );
};

export default Register;