import { Routes, Route } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import AccountPage from './pages/AccountPage';
import ConfirmationPage from './pages/ConfirmationPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectRoute';
import DashboardPage from './pages/DashboardPage';
import SetPasswordPage from './pages/SetPasswordPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/customers" element={
        <ProtectedRoute><CustomerPage /></ProtectedRoute>
      } />
      <Route path="/customers/confirmation" element={
        <ProtectedRoute><ConfirmationPage /></ProtectedRoute>
      } />
      <Route path="/accounts" element={
        <ProtectedRoute><AccountPage /></ProtectedRoute>
      } />
      <Route path="/customers/:customerId/accounts/new" element={
        <ProtectedRoute><AccountPage /></ProtectedRoute>
      } />
      <Route path="/dashboard" element={
  <ProtectedRoute><DashboardPage /></ProtectedRoute>
} />
<Route path="/set-password" element={<SetPasswordPage />} />
    </Routes>
  );
}

export default App;