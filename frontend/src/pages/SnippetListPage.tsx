import React from 'react';
import { Link } from 'react-router-dom';

const SnippetListPage: React.FC = () => {
  return (
    <div>
      <h1>Snippet List</h1>
      {/* Placeholder for Snippet List */}
      <Link to="/new">
        <button>Create New Snippet</button>
      </Link>
    </div>
  );
};

export default SnippetListPage;
