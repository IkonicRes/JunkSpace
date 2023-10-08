// src/App.jsx
import React from 'react';
import HomePage from './components/HomePage';

function App({ tab }) {
  return (
    <div>
      {tab === 'home' && <HomePage />}
      {/* Add logic for other tabs here */}
    </div>
  );
}

export default App;
