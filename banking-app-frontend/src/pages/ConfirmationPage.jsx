import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/ConfirmationPage.css';
import '../styles/shared.css';


function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
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

  const isRegistrationFlow = data.flowType === 'registration';

  return (
    <div className="page-container">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h1 className="confirmation-title">
          {isRegistrationFlow ? 'Registration Successful' : 'Account Opened Successfully'}
        </h1>
        <p className="confirmation-subtitle">
          {isRegistrationFlow
            ? "You're all set. Please log in to continue."
            : 'The new account has been created'}
        </p>

        {isRegistrationFlow ? (
          <>
            <div className="detail-row">
              <span className="detail-label">Customer ID</span>
              <span className="detail-value">{data.customerId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Name</span>
              <span className="detail-value">{data.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email</span>
              <span className="detail-value">{data.email}</span>
            </div>
          </>
        ) : (
          <>
            <div className="detail-row">
              <span className="detail-label">Account Number</span>
              <span className="detail-value">{data.accountNo}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">IFSC Code</span>
              <span className="detail-value">{data.ifscCode}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Balance</span>
              <span className="detail-value">₹{data.balance}</span>
            </div>
          </>
        )}

        <div className="confirmation-actions">
          <button className="submit-button" onClick={() => window.print()}>
            Print
          </button>
          {isRegistrationFlow ? (
            <button className="secondary-button" onClick={() => navigate('/login')}>
              Continue to Login
            </button>
          ) : (
            <button className="secondary-button" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
// Render to create user credentials (userName & password) SIGN IN -> login