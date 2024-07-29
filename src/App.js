import React from 'react';
import EmailFinder from './components/EmailFinder';
import CompanyEmails from './components/CompanyEmails';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Email Finder by EmailScout</h1>
        <p className="text-gray-600 mt-2">Find or generate professional emails in seconds.</p>
      </header>
      <div className="flex flex-col space-y-8">
        <EmailFinder />
        <CompanyEmails />
      </div>
    </div>
  );
}

export default App;
