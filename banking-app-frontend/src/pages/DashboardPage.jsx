import '../styles/DashboardPage.css';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { decodeToken } from '../utils/jwtHelper';
import { getCurrentCustomer } from '../api/customerApi';
import { getAccountById } from '../api/accountApi';

function DashboardPage() {
  const { token, logout } = useAuth();
  const decoded = decodeToken(token);

  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [customerError, setCustomerError] = useState('');

  const [lookupId, setLookupId] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurrentCustomer = async () => {
      try {
        const data = await getCurrentCustomer();
        setCurrentCustomer(data);
      } catch (error) {
        setCustomerError('Could not load your profile.');
      } finally {
        setLoadingCustomer(false);
      }
    };
    fetchCurrentCustomer();
  }, []);

  const handleLookup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const data = await getAccountById(lookupId);
      setLookupResult(data);
    } catch (error) {
      setLookupError('No account found with that ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Signed in as</p>
          <h1 className="dashboard-user">{decoded?.sub}</h1>
        </div>
        <button className="logout-button" onClick={logout}>Logout</button>
      </header>

      <section className="dashboard-actions">
        {loadingCustomer ? (
          <div className="action-card">
            <span className="action-desc">Loading your account...</span>
          </div>
        ) : customerError ? (
          <div className="action-card">
            <span className="action-desc general-error">{customerError}</span>
          </div>
        ) : (
          <Link to={`/customers/${currentCustomer.customerId}/accounts/new`} className="action-card register">
            <span className="action-icon">＋</span>
            <span className="action-label">Open Account</span>
            <span className="action-desc">For {currentCustomer.name}</span>
          </Link>
        )}

        <Link to="/accounts/deposit" className="action-card deposit">
          <span className="action-icon">↓</span>
          <span className="action-label">Deposit</span>
          <span className="action-desc">Add funds to an account</span>
        </Link>
        <Link to="/accounts/withdraw" className="action-card withdraw">
          <span className="action-icon">↑</span>
          <span className="action-label">Withdraw</span>
          <span className="action-desc">Take funds from an account</span>
        </Link>
        <Link to="/accounts/transfer" className="action-card transfer">
          <span className="action-icon">⇄</span>
          <span className="action-label">Transfer</span>
          <span className="action-desc">Move funds between accounts</span>
        </Link>
      </section>

      <section className="lookup-section">
        <h2 className="section-title">Look up an account</h2>
        <p className="section-subtitle">Search by account ID to view balance and status</p>

        <form className="lookup-form" onSubmit={handleLookup}>
          <input
            className="lookup-input"
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
            placeholder="Account ID, e.g. 5"
          />
          <button type="submit" className="lookup-button" disabled={loading || !lookupId}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {lookupError && <p className="general-error">{lookupError}</p>}

        {lookupResult && (
          <div className="result-card">
            <div className="detail-row">
              <span className="detail-label">Account No</span>
              <span className="detail-value mono">{lookupResult.accountNo}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Balance</span>
              <span className="detail-value mono balance">₹{Number(lookupResult.balance).toLocaleString('en-IN')}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status</span>
              <span className="detail-value">{lookupResult.accountStatus}</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;