import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { decodeToken } from '../utils/jwtHelper';
import { getCustomerById } from '../api/customerApi';
import { getAccountById } from '../api/accountApi';
import '../styles/DashboardPage.css';

function DashboardPage() {
  const { token, logout } = useAuth();
  const decoded = decodeToken(token);

  const [lookupId, setLookupId] = useState('');
  const [lookupType, setLookupType] = useState('customer');
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const data = lookupType === 'customer'
        ? await getCustomerById(lookupId)
        : await getAccountById(lookupId);
      setLookupResult({ type: lookupType, data });
    } catch (error) {
      setLookupError(`No ${lookupType} found with that ID.`);
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
        <Link to="/accounts" className="action-card">
          <span className="action-icon">＋</span>
          <span className="action-label">Create new account</span>
          <span className="action-desc">Open a new account</span>
        </Link>
        <Link to="/accounts/deposit" className="action-card">
          <span className="action-icon">↓</span>
          <span className="action-label">Deposit</span>
          <span className="action-desc">Add funds to an account</span>
        </Link>
        <Link to="/accounts/withdraw" className="action-card">
          <span className="action-icon">↑</span>
          <span className="action-label">Withdraw</span>
          <span className="action-desc">Take funds from an account</span>
        </Link>
        <Link to="/accounts/transfer" className="action-card">
          <span className="action-icon">⇄</span>
          <span className="action-label">Transfer</span>
          <span className="action-desc">Move funds between accounts</span>
        </Link>
      </section>

      <section className="lookup-section">
        <h2 className="section-title">Look up a record</h2>
        <p className="section-subtitle">
          Enter a customer or account ID to view details
        </p>

        <form className="lookup-form" onSubmit={handleLookup}>
          <select
            value={lookupType}
            onChange={(e) => setLookupType(e.target.value)}
            className="lookup-select"
          >
            <option value="customer">Customer ID</option>
            <option value="account">Account ID</option>
          </select>
          <input
            className="lookup-input"
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
            placeholder="e.g. 19"
          />
          <button type="submit" className="lookup-button" disabled={loading || !lookupId}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {lookupError && <p className="general-error">{lookupError}</p>}

        {lookupResult?.type === 'customer' && (
          <div className="result-card">
            <div className="detail-row">
              <span className="detail-label">Customer ID</span>
              <span className="detail-value">{lookupResult.data.customerId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Name</span>
              <span className="detail-value">{lookupResult.data.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email</span>
              <span className="detail-value">{lookupResult.data.email}</span>
            </div>
            <Link
              to={`/customers/${lookupResult.data.customerId}/accounts/new`}
              className="submit-button result-action"
            >
              Open Account for This Customer
            </Link>
          </div>
        )}

        {lookupResult?.type === 'account' && (
          <div className="result-card">
            <div className="detail-row">
              <span className="detail-label">Account No</span>
              <span className="detail-value mono">{lookupResult.data.accountNo}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Balance</span>
              <span className="detail-value mono balance">₹{Number(lookupResult.data.balance).toLocaleString('en-IN')}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status</span>
              <span className="detail-value">{lookupResult.data.accountStatus}</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;