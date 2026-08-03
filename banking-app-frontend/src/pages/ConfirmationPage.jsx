import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';

function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = location.state;

  if (!customer) {
    return (
      <div className="page-container">
        <div className="form-card">
          <p>No registration data found.</p>
          <button className="submit-button" onClick={() => navigate('/customers')}>
            Go to Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h1 className="confirmation-title">Registration Successful</h1>
        <p className="confirmation-subtitle">The customer profile has been created</p>

        <div className="detail-row">
          <span className="detail-label">Customer ID</span>
          <span className="detail-value">{customer.customerId}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Name</span>
          <span className="detail-value">{customer.name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email</span>
          <span className="detail-value">{customer.email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Phone</span>
          <span className="detail-value">{customer.phoneNo}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Registered On</span>
          <span className="detail-value">{new Date(customer.createdAt).toLocaleString()}</span>
        </div>

        <div className="confirmation-actions">
          <button className="submit-button" onClick={() => navigate('/AccountPage')}>
                Create Account
          </button>
          <button className="secondary-button" onClick={() =>window.print()}>
                Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;