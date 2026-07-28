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
            setSuccessMessage(`Customer created successfully. ID: ${response.customerid}`);
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
                <input name="name" placeholder="Enter Your Full Name" value={formData.name} onChange={handleChange} />
                <input name="fatherName" placeholder="Enter Father's name" value={formData.fatherName} onChange={handleChange} />
                <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
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
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
        </div>
    );
}

export default CustomerPage;

/*

    database bnana h tabhi kuch hoga 


    Step 4: Maven clean build
Ab backend project folder me jao (jahan pom.xml hai):

bash
cd "C:\Users\Diya Dewa\OneDrive\Desktop\Work\Banking Application\banking-app-backend\banking-application"
mvn clean install
🔹 Step 5: Backend run karo
bash
mvn spring-boot:run
Console me aayega:

Code
Tomcat started on port(s): 8080
Matlab backend chal raha hai.

🔹 Step 6: Frontend connect karo
React ke customerApi.js me ensure karo ki endpoint match kare:

js
axios.post("http://localhost:8080/customers", data)
*/
