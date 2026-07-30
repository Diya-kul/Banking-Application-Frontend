import { useState } from 'react';
import { createCustomer } from '../api/customerApi';

const initialFormState = {
  name: '',
  fatherName: '',
  address: '',
  email: '',
  adharId: '',
  phoneNo: '',
  dob: '',
  gender: '',
};

function CustomerPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await createCustomer(formData);
      setSuccessMessage(`Customer created successfully. ID: ${response.customerId}`);
      setFormData(initialFormState);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Failed to create customer.');
      } else {
        setErrorMessage('Could not reach the server. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Customer Registration</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
        <input name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="adharId" placeholder="Aadhar ID (12 digits)" value={formData.adharId} onChange={handleChange} />
        <input name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} />
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} />

        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Register Customer'}
        </button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default CustomerPage;