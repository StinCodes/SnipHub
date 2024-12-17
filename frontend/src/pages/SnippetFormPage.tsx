import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createSnippet, getSnippetById, updateSnippet } from '../api/snippetsAPI';

const SnippetFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [tags, setTags] = useState('');

  // Fetch snippet data if in edit mode
  useEffect(() => {
    if (id) {
      const fetchSnippet = async () => {
        try {
          const snippet = await getSnippetById(id);
          setTitle(snippet.title);
          setCode(snippet.code);
          setLanguage(snippet.language);
          setTags(snippet.tags.join(', '));
        } catch (error) {
          console.error('Error fetching snippet:', error);
        }
      };

      fetchSnippet();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const snippetData = {
      title,
      code,
      language,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    try {
      if (id) {
        // Edit mode: update snippet
        await updateSnippet(id, snippetData);
      } else {
        // Create mode: add a new snippet
        await createSnippet(snippetData);
      }
      navigate('/'); // Redirect to the snippet list page
    } catch (error) {
      console.error('Error saving snippet:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Snippet' : 'Create Snippet'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit">{id ? 'Update Snippet' : 'Create Snippet'}</button>
      </form>
    </div>
  );
};

export default SnippetFormPage;
