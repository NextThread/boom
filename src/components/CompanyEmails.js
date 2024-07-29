import React, { useState } from 'react';
import axios from 'axios';

const CompanyEmails = () => {
  const [companyName, setCompanyName] = useState('');
  const [emails, setEmails] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/get-emails-by-company', { companyName });
      setEmails(response.data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Get All Emails by Company</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Get Emails
        </button>
      </form>
      {emails.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Emails</h3>
          <ul className="list-disc list-inside bg-gray-100 p-4 rounded">
            {emails.map((email, index) => (
              <li key={index}>{email.person_name}: {email.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompanyEmails;
