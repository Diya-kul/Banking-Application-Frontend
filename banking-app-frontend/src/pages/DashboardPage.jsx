// src/pages/DashboardPage.jsx
import { useAuth } from '../context/AuthContext';
import { decodeToken } from '../utils/jwtHelper';
import { Link } from 'react-router-dom';
import '../styles/shared.css';

function DashboardPage() {
  const { token, logout } = useAuth();
  const decoded = decodeToken(token);

  return (
    <div className="page-container">
      <div className="form-card">
        <h1 className="form-title">Welcome</h1>
        <p className="form-subtitle">Logged in as {decoded?.sub}</p>

        <div className="dashboard-actions">
          <Link to="/customers" className="submit-button">Register New Customer</Link>
          <button className="secondary-button" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;