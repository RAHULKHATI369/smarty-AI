import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SmartSpaceDashboard from './components/SmartSpaceDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SmartSpaceDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
