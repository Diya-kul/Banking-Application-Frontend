import { Routes, Route } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import AccountPage from './pages/AccountPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  return (
    <Routes>
      <Route path="/customers" element={<CustomerPage />} />
      <Route path="/customers/confirmation" element={<ConfirmationPage />} />
      <Route path="/accounts" element={<AccountPage />} />
    </Routes>
  );
}

export default App;