import React from 'react';
import { useParams } from 'react-router-dom';

const SnippetFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>{id ? `Edit Snippet ${id}` : 'Create New Snippet'}</h1>
      {/* Placeholder for Snippet Form */}
      <form>
        <input type="text" placeholder="Title" />
        <textarea placeholder="Code"></textarea>
        <input type="text" placeholder="Language" />
        <input type="text" placeholder="Tags (comma-separated)" />
        <button type="submit">{id ? 'Update Snippet' : 'Create Snippet'}</button>
      </form>
    </div>
  );
};

export default SnippetFormPage;
