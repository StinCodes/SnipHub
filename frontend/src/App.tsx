import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SnippetListPage from './pages/SnippetListPage';
import SnippetFormPage from './pages/SnippetFormPage';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Route for the Snippet List Page */}
      <Route path="/" element={<SnippetListPage />} />

      {/* Route for the Create Snippet Page */}
      <Route path="/new" element={<SnippetFormPage />} />

      {/* Route for the Edit Snippet Page */}
      <Route path="/edit/:id" element={<SnippetFormPage />} />

      {/* Fallback Route for Undefined Pages */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default App;
