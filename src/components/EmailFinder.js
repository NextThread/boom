import React, { useState } from 'react';
import axios from 'axios';

const EmailFinder = () => {
  const [companyName, setCompanyName] = useState('');
  const [personName, setPersonName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/find-email', { companyName, personName });
      setEmail(response.data.email);
    } catch (error) {
      console.error('Error finding/generating email:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Find or Generate Email</h2>
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
        <div>
          <label className="block text-gray-700">Person Name</label>
          <input
            type="text"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Find Email
        </button>
      </form>
      {email && (
        <div className="mt-4 bg-green-100 p-4 rounded">
          <p>Email Found/Generated: <span className="font-bold">{email}</span></p>
        </div>
      )}
    </div>
  );
};

export default EmailFinder;
