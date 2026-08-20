import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerById } from '../api/customerApi';

function AccountPage(){
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [loadError, setLoadError] = useSetate('');

  useEffect(
    () => {
      const fetchCustomer = async () => {
        try {
          const data = await getCustomerById(customerId);
          setCustomer(data);
          } catch (error){
              setLoadError('Could not load customer details.');
            } finally{
                setLoadingCustomer(false);
              }
      };

      fetchCustomer();
    }, 
    [customerId]
  );

  if (loadingCustomer){
    return <div className = "page-container">
                <p>Loading customer details....</p>
            </div>;
  }

  if (loadError){
    return <div className = "page-container">
              <p  className = "general-error">{loadError}</p>
            </div>;
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h1 className='form-title'>Open New Account</h1>
        <p className='form-subtitle'> for {customer.name} (Customer ID: {customer.customerId})</p>
        {/* form fields will go here next */}
      </div>
    </div>
  );
}

export default AccountPage;